require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

var Hammer = require("hammerjs");

var $ = require("./lib/qsa");
var closest = require("./lib/closest");
var debounce = require("./lib/debounce");

// Lazy-load non-gallery images
var lazyImages = $(".lazy-load");
var lazyScroll = function() {
  lazyImages = lazyImages.filter(function(img) {
    if (img.src) return false;
    var bounds = img.getBoundingClientRect();
    // very conservative bounds here
    if (bounds.bottom && bounds.top < window.innerHeight * 2) {
      img.src = img.getAttribute("data-src");
      return false;
    }
    return true;
  });
};
window.addEventListener("scroll", debounce(lazyScroll));
lazyScroll();

var loadGalleryImage = function(frame) {
  var img = frame.querySelector("img");
  if (!img.src) img.src = img.getAttribute("data-src");
  return img;
};

// move between slides
var advance = function(gallery, direction) {
  var caption = gallery.querySelector(".caption");
  var current = gallery.querySelector(".active");
  var images = $(".gallery-img", gallery);
  var index = images.indexOf(current);
  var direction;
  if (direction == "right") {
    var next = images[index + 1];
    var afterNext = images[index + 2];
  } else {
    var next = images[index - 1];
    var afterNext = images[index - 2];
  }

  if (!next) return;

  var image = loadGalleryImage(next);
  caption.innerHTML = image.alt;
  gallery.querySelector(".count").innerHTML = next.getAttribute("data-index") * 1 + 1;
  if (afterNext) loadGalleryImage(afterNext);

  next.classList.add("active");
  current.classList.remove("active");

  next.classList.remove("post-active", "animate", "fade");
  current.classList.add("post-active", "animate");
  next.classList.add(direction);
  var reflow = next.offsetHeight;
  current.classList.add("fade");
  next.classList.add("animate");
  reflow = next.offsetHeight;
  next.classList.remove(direction);
}

var galleries = $(".gallery");
galleries.forEach(function(g) {
  g.querySelector(".caption").innerHTML = g.querySelector(".active img").alt;
  g.addEventListener("click", function(e) {
    var target = closest(e.target, ".arrow");
    if (!target.classList.contains("arrow")) return;
    advance(g, target.classList.contains("next") ? "right" : "left");
  });
  var touch = new Hammer(g);
  touch.on("swiperight", () => advance(g, "left"));
  touch.on("swipeleft", () => advance(g, "right"));
});
// lazy-load the next slide, don't do it so aggressively
window.addEventListener("scroll", function() {
  galleries = galleries.filter(function(g) {
    var bounds = g.getBoundingClientRect();
    if (bounds.top < window.innerHeight) {
      var nextImg = g.querySelector(".active + .gallery-img img");
      if (nextImg.src) return false;
      nextImg.src = nextImg.getAttribute("data-src");
    }
    return true;
  })
})


$(".sidestory").forEach(function(r) {
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
        //load images inside
        lazyScroll();
        setTimeout(function() {
          inner.style.height = "";
          inner.classList.remove("animate");
        }, 300);
      }
    }
  })
});