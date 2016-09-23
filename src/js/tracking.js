var $ = require("./lib/qsa");
var track = require("./lib/tracking");

// Sidebars
$(".sidestory").forEach(function(item) {
  item.addEventListener("click", function(e) {
    track("interactive", "sidestory", "sidestory");
  });
});

// Galleries
$(".gallery").forEach(function(item) {
  item.addEventListener("click", function(e) {
    track("interactive", "gallery", "gallery");
  });
});
