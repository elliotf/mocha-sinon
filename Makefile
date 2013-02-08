testwatch:
	./node_modules/.bin/mocha --recursive -R list -w

test:
	./node_modules/.bin/mocha --recursive -R list

clean:
	rm -rf node_modules

install:
	npm install

.PHONY: clean install test testwatch
