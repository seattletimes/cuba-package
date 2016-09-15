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