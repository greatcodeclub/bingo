function Call(receiver, name, argumentNodes, blockNode) {
  this.receiver = receiver
  this.name = name
  this.argumentNodes = argumentNodes || []
  this.blockNode = blockNode
}
exports.Call = Call

Call.prototype.eval = function(scope) {
  var receiver = this.receiver || scope,
      value = receiver.get(this.name),
      args = this.argumentNodes.map(function(node) { return node.eval(scope) })

  if (value.apply) {
    return value.apply(receiver, args)
  }

  return value
}