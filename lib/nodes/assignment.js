function Assignment(name, valueNode) {
  this.name = name
  this.valueNode = valueNode
}
exports.Assignment = Assignment

Assignment.prototype.eval = function(scope) {
  var value = this.valueNode.eval(scope)
  scope.set(this.name, value)
  return value
}