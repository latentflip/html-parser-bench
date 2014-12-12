var fs = require('fs');
var path = require('path');
var Benchmark = require('benchmark');
var htmlparser2 = require('htmlparser2');
var parse5 = require('parse5');
var htmlParseStringify = require('html-parse-stringify');

var testPages = [
  fs.readFileSync(__dirname + '/data/page_google.html').toString(),
  //fs.readFileSync(__dirname + '/data/page_habrahabr-70330.html').toString(),
  //fs.readFileSync(__dirname + '/data/page_habrahabr-index.html').toString(),
  //fs.readFileSync(__dirname + '/data/page_wikipedia.html').toString()
];

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
        document.write('Starting benchmark. Fasten your seatbelts...' + '<br>');
    })

    .on('cycle', function (event) {
        document.write(event.target.toString() + '<br>');
    })

    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })

    .run();
