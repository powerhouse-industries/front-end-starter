#!/bin/bash

scss-lint source/scss -c .scss-lint.yml
node-sass source/scss/main.scss --output-style compressed build/css/main.css
node-sass source/scss/print.scss --output-style compressed build/css/print.css
node-sass source/scss/ie8.scss --output-style compressed build/css/ie8.css
autoprefixer build/css/main.css
terminal-notifier -group 'sass-changes' -title 'Sass' -message 'Sass compiled successfully.'
