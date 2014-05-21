var assert = require("assert"),
    lexer = require('../lib/lexer')

describe('Lexer', function() {
  it('lex indent', function () {
    assert.deepEqual(["NAME", "NEWLINE",
                              "INDENT", "NAME", "DEDENT", "EOF"], lex("a\n  b"))
  })

  it('lex new lines', function() {
    assert.deepEqual(["NEWLINE", "EOF"], lex("\n"))
  })

  it('lex string', function() {
    assert.deepEqual(["COLON", "STRING", "EOF"], lex(": hi there"))
  })

  function lex(input) {
    lexer.setInput(input)
    var token, tokens = []
    while ((token = lexer.lex())) tokens.push(token)
    return tokens
  }
})
