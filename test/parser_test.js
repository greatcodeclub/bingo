var assert = require("assert"),
    parser = require('../lib/parser').parser,
    nodes = require('../lib/nodes')

describe('Parser', function() {
  it('parse simple call', function () {
    assert.deepEqual(parser.parse("a"), new nodes.Block([
        new nodes.Call(null, "a")
      ]))
  })

  it('parse call with receiver', function () {
    assert.deepEqual(parser.parse("a b"), new nodes.Block([
        new nodes.Call(new nodes.Call(null, "a"), "b")
      ]))
  })

  it('parse call with string', function () {
    var string = new nodes.String()
    string.add(new nodes.Literal("Hi "))
    string.add(new nodes.Call(null, "there"))
    string.add(new nodes.Literal("!"))

    assert.deepEqual(parser.parse("a: Hi @there!"), new nodes.Block([
        new nodes.Call(null, "a", [string])
      ]))
  })
  
  it('parse call with number', function () {
    assert.deepEqual(parser.parse("every 1ms"), new nodes.Block([
        new nodes.Call(null, "every", [new nodes.Literal(1)])
      ]))
  })

  it('parse call with number', function () {
    assert.deepEqual(parser.parse("every 1ms"), new nodes.Block([
        new nodes.Call(null, "every", [new nodes.Literal(1)])
      ]))
  })
})