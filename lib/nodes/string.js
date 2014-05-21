var runtime = require('../runtime')

function String(initial) {
  this.parts = []
  if (initial) this.parts.push(initial)
}
exports.String = String

String.prototype.add = function(part) {
  this.parts.push(part)
  return this
}

String.prototype.eval = function(scope) {
  var string = this.parts.map(function(part) { return part.eval(scope).value }).join('')

  return new runtime.Object(string)
}
