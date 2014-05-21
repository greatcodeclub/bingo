// Based on https://github.com/aaditmshah/bianca/blob/master/lib/lexer.js
var Lexer = require("lex")

var row = 1, col = 1

// Start conditions
var INITIAL = 0
var STRING = 1
var PRE_STRING = 3

var indent = [0]

var lexer = module.exports = new Lexer(function(char) {
  throw new Error("Unexpected character at row " + row + ", col " + col + ": " + char)
})

lexer.addRule(/\n+/, function(lexeme) {
  col = 1
  row += lexeme.length
  this.state = INITIAL
  return "NEWLINE"
})

lexer.addRule(/^ */gm, function(lexeme) {
  var indentation = lexeme.length

  col += indentation

  if (indentation > indent[0]) {
    indent.unshift(indentation)
    return "INDENT"
  }

  var tokens = []

  while (indentation < indent[0]) {
    tokens.push("DEDENT")
    indent.shift()
  }

  if (tokens.length) return tokens
})

lexer.addRule(/ +/, function(lexeme) {
  col += lexeme.length
  // Ignore spaces
  if (this.state === PRE_STRING) this.state = STRING
})

lexer.addRule(/[^\n@]+/, function(lexeme) {
  col += lexeme.length
  this.yytext = lexeme
  return "STRING"
}, [STRING])

lexer.addRule(/@[a-z]\w*/, function(lexeme) {
  col += lexeme.length
  this.yytext = lexeme.slice(1)
  return "STRING_NAME"
}, [STRING])

lexer.addRule(/\:/, function(lexeme) {
  col += lexeme.length
  this.state = PRE_STRING
  return "COLON"
})

lexer.addRule(/(<|>)\=?/, function(lexeme) {
  col += lexeme.length
  this.yytext = lexeme
  this.state = PRE_STRING
  return "COMP"
})

lexer.addRule(/(is|=)/, function(lexeme) {
  col += lexeme.length
  this.yytext = lexeme
  this.state = PRE_STRING
  return "EQ"
})

lexer.addRule(/\d+(ms)?/, function(lexeme) {
  col += lexeme.length
  this.yytext = parseInt(lexeme)
  return "NUMBER"
})

lexer.addRule(/\d+sec/, function(lexeme) {
  col += lexeme.length
  this.yytext = parseInt(lexeme) * 1000
  return "NUMBER"
})

function generatesToken(name) {
  return function(lexeme) {
    col += lexeme.length
    this.yytext = lexeme
    return name
  }
}

lexer.addRule(/if/, generatesToken("IF"))
lexer.addRule(/is/, generatesToken("IS"))

lexer.addRule(/[a-z]\w*/, generatesToken("NAME"))

lexer.addRule(/$/, function() {
  var tokens = []

  while (indent.shift()) {
    tokens.push("DEDENT")
  }

  tokens.push("EOF")

  return tokens
})