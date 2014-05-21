var runtime = require('../runtime')

function Literal(value) {
  this.value = value
}
exports.Literal = Literal

Literal.prototype.eval = function(scope) {
  return new runtime.Object(this.value)
}