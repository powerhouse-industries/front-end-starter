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
echo "$(tput setaf 6)Copying files to /build/javascripts ...$(tput sgr 0)"
cp source/javascripts/libraries/*.js build/javascripts/libraries
cp source/javascripts/libraries/**/*.js build/javascripts/libraries
cp source/javascripts/templates/* build/javascripts/templates
echo "$(tput setaf 2)Done!$(tput sgr 0)"

## If there are JavaScript modules
if [ $modules -eq 2 ]; then
  cp source/javascripts/modules/**/*.html build/javascripts/templates
  uglifyjs source/javascripts/libraries/media-match/media.match.min.js source/javascripts/libraries/modernizr/modernizr.js source/javascripts/libraries/picturefill/picturefill.min.js source/javascripts/libraries/fastclick/fastclick.js source/javascripts/libraries/cookie-disclaimer/cookieDisclaimer.min.js source/javascripts/libraries/checkmq/checkMQ.js source/javascripts/modules/*.js source/javascripts/modules/**/*.js -o build/javascripts/application.min.js --source-map build/javascripts/application.min.js.map --source-map-url /javascripts/application.min.js.map
else
  uglifyjs source/javascripts/libraries/media-match/media.match.min.js source/javascripts/libraries/modernizr/modernizr.js source/javascripts/libraries/picturefill/picturefill.min.js source/javascripts/libraries/fastclick/fastclick.js source/javascripts/libraries/cookie-disclaimer/cookieDisclaimer.min.js source/javascripts/libraries/checkmq/checkMQ.js source/javascripts/modules/*.js source/javascripts/*.js -o build/javascripts/application.min.js --source-map build/javascripts/application.min.js.map --source-map-url /javascripts/application.min.js.map
fi

for f in `ls build/javascripts/libraries/*.js`; do
  echo "$(tput setaf 6)Minifying $f...$(tput sgr 0)"
  uglifyjs "$f" -o "$f"
done
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'js-changes' -title 'JavaScript' -message 'JavaScript compiled successfully.'
fi
