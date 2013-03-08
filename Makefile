mocha :
	mocha test/*_test.pogo
	
stitch :
	stitchy -t js/fiddly.js

server :
	pogo server.pogo

test : mocha