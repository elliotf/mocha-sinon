install:
	npm install

clean:
	rm -rf node_modules

test:
	./node_modules/.bin/mocha --recursive -R list
	./node_modules/.bin/mocha-phantomjs -p ./node_modules/.bin/phantomjs ./test/index.html

testwatch:
	bash -c "./node_modules/.bin/nodemon -e js,json,yaml --exec bash -c 'make test; date' ."

.PHONY: clean install test testwatch
