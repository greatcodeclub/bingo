var runtime = require('../runtime')

function Block(nodes) {
  this.nodes = nodes
}
exports.Block = Block

Block.prototype.add = function(nodes) {
  this.nodes = this.nodes.concat(nodes)
  return this
}

Block.prototype.eval = function(scope) {
  var returnValue = runtime.empty

  this.nodes.forEach(function(node) {
    returnValue = node.eval(scope)
  })

  return returnValue
}