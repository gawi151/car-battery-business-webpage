import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = realpathSync(join(dirname(fileURLToPath(import.meta.url)), ".."));
const dryRun = process.argv.includes("--dry-run");
const helpRequested = process.argv.includes("--help") || process.argv.includes("-h");
const unknownArguments = process.argv.slice(2).filter((argument) => !["--dry-run", "--help", "-h"].includes(argument));

const publicFiles = [
  "index.html",
  "404.html",
  "privacy-policy.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "CNAME"
];

function run(command, args, options = {}) {
  const allowedExitCodes = options.allowedExitCodes || [0];
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit"
  });

  if (result.error) {
    throw result.error;
  }

  if (!allowedExitCodes.includes(result.status)) {
    const details = options.capture ? `\n${result.stderr || result.stdout}` : "";
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}.${details}`);
  }

  return result;
}

function git(args, options = {}) {
  return run("git", args, options);
}

function capturedGit(args, options = {}) {
  return git(args, { ...options, capture: true }).stdout.trim();
}

function copyPublicSite(siteDirectory) {
  mkdirSync(siteDirectory, { recursive: true });

  for (const publicFile of publicFiles) {
    const source = join(repoRoot, publicFile);

    if (!existsSync(source)) {
      throw new Error(`Required public file is missing: ${publicFile}`);
    }

    copyFileSync(source, join(siteDirectory, publicFile));
  }

  cpSync(join(repoRoot, "assets"), join(siteDirectory, "assets"), { recursive: true });
  writeFileSync(join(siteDirectory, ".nojekyll"), "");
}

function replaceWorktreeContents(siteDirectory, worktreeDirectory) {
  git(["rm", "-r", "-f", "-q", "--ignore-unmatch", "."], { cwd: worktreeDirectory });

  for (const entry of readdirSync(siteDirectory, { withFileTypes: true })) {
    cpSync(join(siteDirectory, entry.name), join(worktreeDirectory, entry.name), {
      recursive: entry.isDirectory()
    });
  }
}

async function main() {
  if (helpRequested) {
    console.log("Usage: node scripts/publish-gh-pages.mjs [--dry-run]");
    console.log("  --dry-run  Build and compare the deployment without committing or pushing.");
    return;
  }

  if (unknownArguments.length > 0) {
    throw new Error(`Unknown argument(s): ${unknownArguments.join(", ")}`);
  }

  if (capturedGit(["branch", "--show-current"]) !== "main") {
    throw new Error("Publishing must be run from the main branch.");
  }

  if (capturedGit(["status", "--porcelain", "--untracked-files=all"])) {
    throw new Error("The working tree is not clean. Commit or remove local changes before publishing.");
  }

  console.log("Fetching the latest main and gh-pages branches...");
  git(["fetch", "origin", "--prune"]);

  const sourceSha = capturedGit(["rev-parse", "HEAD"]);
  const remoteMainSha = capturedGit(["rev-parse", "origin/main"]);

  if (sourceSha !== remoteMainSha) {
    throw new Error("Local main must exactly match origin/main before publishing.");
  }

  console.log("Running site checks...");
  run(process.execPath, ["tests/verify-site.mjs"]);

  const temporaryDirectory = mkdtempSync(join(tmpdir(), "akumulatory-pages-"));
  const siteDirectory = join(temporaryDirectory, "site");
  const worktreeDirectory = join(temporaryDirectory, "gh-pages");
  let worktreeAdded = false;

  try {
    copyPublicSite(siteDirectory);

    // Keep the deployment branch isolated: git worktree add --detach <path> origin/gh-pages
    git(["worktree", "add", "--detach", worktreeDirectory, "origin/gh-pages"]);
    worktreeAdded = true;

    replaceWorktreeContents(siteDirectory, worktreeDirectory);
    git(["add", "-A"], { cwd: worktreeDirectory });

    const diffResult = git(["diff", "--cached", "--quiet"], {
      cwd: worktreeDirectory,
      allowedExitCodes: [0, 1],
      capture: true
    });

    if (diffResult.status === 0) {
      console.log("No website changes to publish.");
      return;
    }

    console.log("Deployment changes:");
    console.log(capturedGit(["diff", "--cached", "--name-status"], { cwd: worktreeDirectory }));

    if (dryRun) {
      console.log("Dry run complete. Nothing was committed or pushed.");
      return;
    }

    git(["config", "user.name", "github-pages-publisher"], { cwd: worktreeDirectory });
    git(["config", "user.email", "github-pages-publisher@users.noreply.github.com"], { cwd: worktreeDirectory });
    git(["commit", "-m", `Deploy ${sourceSha.slice(0, 7)} from main`], { cwd: worktreeDirectory });
    git(["push", "origin", "HEAD:gh-pages"], { cwd: worktreeDirectory });

    console.log(`Published ${sourceSha.slice(0, 7)} from main to gh-pages.`);
  } finally {
    if (worktreeAdded) {
      try {
        git(["worktree", "remove", "--force", worktreeDirectory]);
      } catch (error) {
        console.warn(`Could not remove temporary worktree: ${error.message}`);
      }
    }

    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`Publish failed: ${error.message}`);
  process.exitCode = 1;
});
