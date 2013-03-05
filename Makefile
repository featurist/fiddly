mocha :
	mocha test/*_test.pogo
	
stitch :
	stitchy -t js/fiddly.js

test : mocha