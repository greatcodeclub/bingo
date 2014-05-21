require('../utils').requireAllInto(__dirname, exports)

var runtime = exports,
    root = runtime.root = new runtime.Scope()

// The null object
runtime.empty = new runtime.Object()
runtime.true = new runtime.Object(true)
runtime.false = new runtime.Object(false)

runtime.bool = function(value) {
  return value ? runtime.true : runtime.false
}

root.this = root

root.set('write', function(what) {
  console.log(what.value)
})