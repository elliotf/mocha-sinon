install:
	npm install

clean:
	rm -rf node_modules

test:
	./node_modules/.bin/mocha --recursive -R list
	./node_modules/.bin/phantomjs  ./node_modules/mocha-phantomjs-core/mocha-phantomjs-core.js ./test/index.html

testwatch:
	bash -c "make test; ./node_modules/.bin/chicken -c 'clear; make test' ."

.PHONY: clean install test testwatch
