var bingo = require('./lib'),
    parser = require('./lib/parser').parser,
    runtime = require('./lib/runtime')

// parser.lexer.input = ">= Marc-Andre"
// var token, tokens = []
// while ((token = parser.lexer.lex())) tokens.push([token, parser.lexer.yytext])
// console.log(tokens)

var node = parser.parse("every 10ms:\n  hi")
console.log(node.nodes[0])

// bingo.eval("name is Marc-Andre\nif name = Marc-Andre\n  write: Name: @name")
