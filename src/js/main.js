require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var qsa = require("./lib/qsa.js");

qsa(".gallery").forEach(function(g) {
  g.querySelector(".caption").innerHTML = g.querySelector(".active img").alt;
  var nextImg = g.querySelector(".active + .gallery-img img");
  nextImg.src = nextImg.getAttribute("data-src");
  g.addEventListener("click", function(e) {
    var target = e.target;
    var caption = g.querySelector(".caption");
    var current = g.querySelector(".active");
    var direction;
    if (target.classList.contains("next")) {
      var next = current.nextElementSibling;
      if (next) var nextNext = next.nextElementSibling;
      direction = "right";
    } else if (target.classList.contains("prev")){
      var next = current.previousElementSibling;
      if (next) var nextNext = next.previousElementSibling;
      direction = "left";
    }
    if (!next || !next.classList.contains("gallery-img")) return;

    var image = next.querySelector("img");
    caption.innerHTML = image.alt;
    g.querySelector(".count").innerHTML = image.getAttribute("data-index") * 1 + 1;
    if (!image.src) image.src = image.getAttribute("data-src");
    if (nextNext && nextNext.classList.contains("gallery-img")) {
      var nnImage = nextNext.querySelector("img");
      if (!nnImage.src) nnImage.src = nnImage.getAttribute("data-src");
    }

    current.classList.remove("active");
    next.classList.add("active");

    next.classList.remove("post-active", "animate");
    current.classList.add("post-active", "animate")
    var reflow = next.offsetHeight;
    next.classList.add(direction);
    var reflow = next.offsetHeight;
    next.classList.add("animate");
    var reflow = next.offsetHeight;
    next.classList.remove(direction);

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