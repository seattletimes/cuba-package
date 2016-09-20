require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var $ = require("./lib/qsa");
var closest = require("./lib/closest");

var loadLazyGallery = function(frame) {
  var img = frame.querySelector("img");
  if (!img.src) img.src = img.getAttribute("data-src");
  return img;
};

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

  var image = loadLazyGallery(next);
  caption.innerHTML = image.alt;
  gallery.querySelector(".count").innerHTML = next.getAttribute("data-index") * 1 + 1;
  if (afterNext) loadLazyGallery(afterNext);

  next.classList.add("active");
  current.classList.remove("active");

  next.classList.remove("post-active", "animate", "fade");
  current.classList.add("post-active", "animate");
  var reflow = next.offsetHeight;
  next.classList.add(direction);
  current.classList.add("fade");
  next.classList.add("animate");
  next.classList.remove(direction);
}

$(".gallery").forEach(function(g) {
  g.querySelector(".caption").innerHTML = g.querySelector(".active img").alt;
  var nextImg = g.querySelector(".active + .gallery-img img");
  nextImg.src = nextImg.getAttribute("data-src");
  g.addEventListener("click", function(e) {
    var target = closest(e.target, ".arrow");
    if (!target.classList.contains("arrow")) return;
    advance(g, target.classList.contains("next") ? "right" : "left");
  });
});

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
        setTimeout(function() {
          inner.style.height = "";
          inner.classList.remove("animate");
        }, 300);
      }
    }
  })
});