./node_modules/.bin/browserify sizes/html-parse-stringify.js > sizes/html-parse-stringify.bundle.js
./node_modules/.bin/uglifyjs sizes/html-parse-stringify.bundle.js > sizes/html-parse-stringify.bundle.min.js

./node_modules/.bin/browserify sizes/htmlparser2.js > sizes/htmlparser2.bundle.js
./node_modules/.bin/uglifyjs sizes/htmlparser2.bundle.js > sizes/htmlparser2.bundle.min.js

./node_modules/.bin/browserify sizes/parse5.js > sizes/parse5.bundle.js
./node_modules/.bin/uglifyjs sizes/parse5.bundle.js > sizes/parse5.bundle.min.js

ls -alh sizes/*.min.js | sed s/\.bundle\.min\.js// | sed "s/sizes\///" | awk '{print $5 " " $9}' > sizes.txt
cat sizes.txt
