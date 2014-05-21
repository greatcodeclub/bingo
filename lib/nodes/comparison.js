var runtime = require('../runtime')

function Comparison(expressionNode, operator, valueNode) {
  this.expressionNode = expressionNode
  this.operator = operator
  this.valueNode = valueNode
}
exports.Comparison = Comparison

Comparison.prototype.eval = function(scope) {
  var expression = this.expressionNode.eval(scope).value,
      value = this.valueNode.eval(scope).value,
      result

  switch (this.operator) {
    case '==':
      result = expression == value
      break;
    case '<':
      result = expression < value
      break;
    case '<=':
      result = expression <= value
      break;
    case '>':
      result = expression > value
      break;
    case '>=':
      result = expression >= value
      break;
  }

  return runtime.bool(result)
}