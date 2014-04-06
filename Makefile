install:
	npm install

clean:
	rm -rf node_modules

test:
	./node_modules/.bin/mocha --recursive -R list
	./node_modules/.bin/mocha-phantomjs -p ./node_modules/.bin/phantomjs ./test/index.html

testwatch:
	bash -c "make test; ./node_modules/.bin/chicken -c 'clear; make test' ."

.PHONY: clean install test testwatch
