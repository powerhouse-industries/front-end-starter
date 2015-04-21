#!/bin/bash

os=`uname`

# Lint all the .scss files
scss-lint source/scss -c .scss-lint.yml

# Compile the scss files
node-sass source/scss/main.scss --output-style compressed build/css/main.css
node-sass source/scss/print.scss --output-style compressed build/css/print.css
node-sass source/scss/ie8.scss --output-style compressed build/css/ie8.css

# Add prefixes
autoprefixer build/css/main.css

# Sort all rules alphabetically – overall it benefits GZIP
csscomb build/css/*

# Compress the CSS a little more
cssnano build/css/main.css build/css/main.css
cssnano build/css/print.css build/css/print.css
cssnano build/css/ie8.css build/css/ie8.css

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'sass-changes' -title 'Sass' -message 'Sass compiled successfully.'
fi
