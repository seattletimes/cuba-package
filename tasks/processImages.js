var exif = require("exif-parser");
var fs = require("fs");
var path = require("path");

module.exports = function(grunt) {

  grunt.registerTask("process-images", function() {

    var files = grunt.file.expand("src/assets/mainbar/*.jpg");

    files.forEach(function(f) {
      var buffer = fs.readFileSync(f);
      var meta = exif.create(buffer).parse();
      var caption = meta.tags.ImageDescription.trim();
      console.log(f + "," + '"' + caption + '"')
    });
  });

};