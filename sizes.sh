./node_modules/.bin/browserify sizes/html-parse-stringify.js > sizes/html-parse-stringify.bundle.js
./node_modules/.bin/uglifyjs sizes/html-parse-stringify.bundle.js > sizes/html-parse-stringify.bundle.min.js
gzip -c sizes/html-parse-stringify.bundle.min.js > sizes/html-parse-stringify.bundle.min.js.gz

./node_modules/.bin/browserify sizes/htmlparser2.js > sizes/htmlparser2.bundle.js
./node_modules/.bin/uglifyjs sizes/htmlparser2.bundle.js > sizes/htmlparser2.bundle.min.js
gzip -c sizes/htmlparser2.bundle.min.js > sizes/htmlparser2.bundle.min.js.gz

./node_modules/.bin/browserify sizes/parse5.js > sizes/parse5.bundle.js
./node_modules/.bin/uglifyjs sizes/parse5.bundle.js > sizes/parse5.bundle.min.js
gzip -c sizes/parse5.bundle.min.js > sizes/parse5.bundle.min.js.gz

ls -alh sizes/*.min.* | sed s/\.bundle\.min\.js// | sed "s/sizes\///" | awk '{print $5 " " $9}' > sizes.txt
cat sizes.txt
