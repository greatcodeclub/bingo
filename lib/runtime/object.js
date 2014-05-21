function Object(value) {
  this.properties = {}
  this.value = value // A JavaScipt string or number.
}
exports.Object = Object

Object.prototype.hasProperty = function(name) {
  return this.properties.hasOwnProperty(name)
}

Object.prototype.get = function(name) {
  if (this.hasProperty(name)) return this.properties[name]
  if (this.hasProperty('__parent__')) return this.properties['__parent__'].get(name)
}

Object.prototype.set = function(name, value) {
  return this.properties[name] = value
}
