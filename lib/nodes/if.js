var runtime = require('../runtime')

function If(condition, body) {
  this.condition = condition
  this.body = body
}
exports.If = If

If.prototype.eval = function(scope) {
  if (this.condition.eval(scope).value) {
    this.body.eval(scope)
  }

  return runtime.empty
}