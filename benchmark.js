var fs = require('fs');
var path = require('path');
var Benchmark = require('benchmark');
var htmlparser2 = require('htmlparser2');
var parse5 = require('parse5');
var htmlParseStringify = require('html-parse-stringify');

var isBrowser = typeof document !== 'undefined';

var log = function (message) {
    if (isBrowser) {
        document.write(message + '<br>');
    } else {
        console.log(message);
    }
};

var testPages = [
  fs.readFileSync(__dirname + '/data/page_google.html').toString(),
  fs.readFileSync(__dirname + '/data/page_habrahabr-70330.html').toString(),
  fs.readFileSync(__dirname + '/data/page_habrahabr-index.html').toString(),
  fs.readFileSync(__dirname + '/data/page_wikipedia.html').toString()
];

if (isBrowser) {
    var testToRun = 1;
    var match = window.location.search.match(/test=(\d+)/);
    if (match && match[1] && parseInt(match[1])) {
        testToRun = parseInt(match[1]);
    }

    testPages = [ testPages[testToRun - 1] ];
    console.log("Running test " + testToRun);
}

new Benchmark.Suite()

    .add('htmlparser2 (https://github.com/fb55/htmlparser2)', function () {
        for (var i = 0; i < testPages.length; i++) {
            var handler = new htmlparser2.DefaultHandler(),
                parser = new htmlparser2.Parser(handler);

            parser.write(testPages[i]);
            parser.end();
        }
    })

    .add('parse5 (https://github.com/inikulin/parse5)', function () {
        for (var i = 0; i < testPages.length; i++) {
            var parser = new parse5.Parser();
            parser.parse(testPages[i]);
        }
    })

    .add('htmlParseStringify (https://github.com/htmlParseStringifyjoreteg/html-parse-stringify)', function () {
        for (var i = 0; i < testPages.length; i++) {
            htmlParseStringify.parse(testPages[i]);
        }
    })

    .on('start', function () {
        console.log('Starting benchmark. Fasten your seatbelts...');
    })

    .on('cycle', function (event) {
        log(event.target.toString());
    })

    .on('complete', function () {
        log('Fastest is ' + this.filter('fastest').pluck('name'));
    })

    .run();
