var fs = require('fs'),
    _ = require('underscore')

// Require all files in path and add all exports to module.
// Path must be relative to utils.js.
exports.requireAllInto = function(path, module) {
  var files = fs.readdirSync(path)

  files.forEach(function(file) {
    var basename = file.split('.', 2)[0]
    _.extend(module, require(path + '/' + basename))
  })
}