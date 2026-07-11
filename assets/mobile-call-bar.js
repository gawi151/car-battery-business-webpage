(function () {
  var heroPhoneCta = document.querySelector("[data-hero-phone-cta]");
  var mobileCallBar = document.querySelector(".mobile-call-bar");

  if (!heroPhoneCta || !mobileCallBar || !("IntersectionObserver" in window)) {
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    document.body.classList.toggle("mobile-call-bar-visible", !entries[0].isIntersecting);
  });

  observer.observe(heroPhoneCta);
}());
