#!/bin/bash

os=`uname`

modules=`find source/javascripts/modules/ -maxdepth 1 -type d | wc -l`

# Check formatting against styleguide
jscs source/javascripts/modules source/javascripts/*.js

# Look for issues
jshint source/javascripts/**.js

# Copy some files into /build
cp source/javascripts/libraries/*.js build/javascripts/libraries
cp source/javascripts/libraries/**/*.js build/javascripts/libraries
cp source/javascripts/templates/* build/javascripts/templates

## If there a JavaScript modules
if [ $modules -eq 2 ]; then
  cp source/javascripts/modules/**/*.html build/javascripts/templates
  uglifyjs source/javascripts/libraries/media-match/media.match.min.js source/javascripts/libraries/modernizr/modernizr.js source/javascripts/libraries/picturefill/picturefill.min.js source/javascripts/libraries/fastclick/fastclick.js source/javascripts/libraries/cookie-disclaimer/cookieDisclaimer.min.js source/javascripts/libraries/checkmq/checkMQ.js source/javascripts/modules/*.js source/javascripts/modules/**/*.js -o build/javascripts/application.min.js --source-map build/javascripts/application.min.js.map --source-map-url /javascripts/application.min.js.map
else
  uglifyjs source/javascripts/libraries/media-match/media.match.min.js source/javascripts/libraries/modernizr/modernizr.js source/javascripts/libraries/picturefill/picturefill.min.js source/javascripts/libraries/fastclick/fastclick.js source/javascripts/libraries/cookie-disclaimer/cookieDisclaimer.min.js source/javascripts/libraries/checkmq/checkMQ.js source/javascripts/modules/*.js source/javascripts/*.js -o build/javascripts/application.min.js --source-map build/javascripts/application.min.js.map --source-map-url /javascripts/application.min.js.map
fi

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'js-changes' -title 'JavaScript' -message 'JavaScript compiled successfully.'
fi
