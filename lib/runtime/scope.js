function Scope(_this, parent) {
  this.this = _this
  this.parent = parent
  this.root = !parent
  this.locals = {}
}
exports.Scope = Scope

Scope.prototype.hasLocal = function(name) {
  return this.locals.hasOwnProperty(name)
}

Scope.prototype.get = function(name) {
  if (this.hasLocal(name)) return this.locals[name] // Look in current scope
  if (this.parent) return this.parent.get(name) // Look in parent scope
  throw new Error(name + " is not defined")
}

Scope.prototype.set = function(name, value) {
  if (this.root || this.hasLocal(name)) return this.locals[name] = value
  return this.parent.set(name, value)
}
