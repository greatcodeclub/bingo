var parser = require('./parser').parser,
    runtime = require('./runtime')

exports.eval = function(input) {
  return parser.parse(input).eval(runtime.root)
}
