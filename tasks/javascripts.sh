#!/bin/bash

modules=`find source/javascripts/modules/ -maxdepth 1 -type d | wc -l`

jshint source/javascripts/**.js
cp source/javascripts/libraries/*.js build/javascripts/libraries
cp source/javascripts/libraries/**/*.js build/javascripts/libraries
cp source/javascripts/templates/* build/javascripts/templates

if [ $modules -eq 2 ]; then
  cp source/javascripts/modules/**/*.html build/javascripts/templates
  uglifyjs source/javascripts/libraries/**/*.js source/javascripts/modules/*.js source/javascripts/modules/**/*.js source/javascripts/*.js  -o build/javascripts/application.min.js --source-map build/javascripts/application.min.js.map --source-map-url /build/javascripts/application.min.js.map
else
  uglifyjs source/javascripts/libraries/**/*.js source/javascripts/modules/*.js source/javascripts/*.js  -o build/javascripts/application.min.js --source-map build/javascripts/application.min.js.map --source-map-url /build/javascripts/application.min.js.map
fi
