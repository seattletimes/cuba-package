require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var qsa = require("./lib/qsa.js");

qsa(".gallery").forEach(function(g) {
  g.addEventListener("click", function(e) {
    var target = e.target;
    var current = g.querySelector(".active");
    if (target.classList.contains("next")) {
      var next = current.nextElementSibling;
      if (next) var nextNext = next.nextElementSibling;
    } else if (target.classList.contains("prev")){
      var next = current.previousElementSibling;
      if (next) var nextNext = next.previousElementSibling;
    }
    if (!next || !next.classList.contains("gallery-img")) return;
    if (!next.src) next.querySelector("img").src = next.querySelector("img").getAttribute("data-src");
    if (nextNext && nextNext.classList.contains("gallery-img") && !nextNext.src) nextNext.querySelector("img").src = nextNext.querySelector("img").getAttribute("data-src");
    current.classList.remove("active");
    next.classList.add("active");
  });
});

qsa(".sidestory").forEach(function(r) {
  r.addEventListener("click", function(e) {
    if (e.target.classList.contains("read-more")) {
      if (r.classList.contains("expanded")) {
        r.classList.remove("expanded");
      } else {
        r.classList.add("expanded");
        var inner = r.querySelector(".inner");
        var height = inner.offsetHeight;
        inner.style.height = "0px";
        inner.classList.add("animate");
        var reflow = inner.offsetHeight;
        inner.style.height = height + "px";
        setTimeout(function() {
          inner.style.height = "";
          inner.classList.remove("animate");
        }, 300);
      }
    }
  })
})

// var animateScroll = require("./lib/animateScroll");

// qsa(".main-nav a").forEach(function(a) {
//   a.addEventListener("click", function(e) {
//     var href = this.getAttribute("href");
//     if (href.indexOf("#") != 0) return;
//     var section = document.querySelector(href);
//     if (!section) return;
//     e.preventDefault();
    
//     animateScroll(section);
//     window.history.pushState(href, href, href);
//   });
// });