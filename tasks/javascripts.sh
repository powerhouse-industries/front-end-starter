#!/bin/bash

os=`uname`
modules=`find source/javascripts/modules/ -maxdepth 1 -type d | wc -l`

# Check formatting against styleguide
echo "$(tput setaf 6)Checking code formating...$(tput sgr 0)"
jscs source/javascripts/modules source/javascripts/*.js
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Check formatting against styleguide
echo "$(tput setaf 6)Checking for duplicated code...$(tput sgr 0)"
jsinspect source/javascripts/main.js source/javascripts/modules/**.js
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Look for issues
echo "$(tput setaf 6)Looking for code errors...$(tput sgr 0)"
jshint source/javascripts/main.js && jshint source/javascripts/modules/**.js
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Copy some files into /build
echo "$(tput setaf 6)Copying files to /build/javascripts...$(tput sgr 0)"
cp source/javascripts/libraries/*.js build/javascripts/libraries
cp source/javascripts/templates/* build/javascripts/templates
echo "$(tput setaf 2)Done!$(tput sgr 0)"

## Compile the JavaScript
echo "$(tput setaf 6)Compiling JavaScript with Browserify...$(tput sgr 0)"
browserify source/javascripts/main.js -o build/javascripts/main.js -t [ babelify --presets [ es2015 ] ]

## Minify the output
uglifyjs build/javascripts/main.js -o build/javascripts/main.js

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'js-changes' -title 'JavaScript' -message 'JavaScript compiled successfully.'
fi
