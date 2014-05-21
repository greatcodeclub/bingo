BIN = "`npm bin`"

lib/parser.js: lib/grammar.jison
	${BIN}/jison $^ -o $@

test: lib/parser.js
	node test.js

watch:
	${BIN}/nodemon -x 'make test' -e 'js jison jisonlex' -q

.PHONY: test watch