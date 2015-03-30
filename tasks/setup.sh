#!/bin/bash

# Store platform name
os=`uname`

# Install all dependencies
sudo npm install
sudo npm install bower -g
sudo npm install bower-installer -g
sudo npm install nodemon -g
sudo npm install parallelshell -g
sudo npm install jshint -g
sudo npm install autoprefixer -g
sudo gem install scss-lint

# Only install terminal notifier on OS X
if [[ "$os" == 'Darwin' ]]; then
  sudo gem install terminal-notifier
fi

# Install all the Bower packages
cd source/javascripts && bower-installer
cd ../../
cd source/scss && bower install
cd ../../
rm -rf source/javascripts/components

# Create the `build` folder structure
mkdir build
mkdir build/javascripts
mkdir build/javascripts/templates
mkdir build/javascripts/libraries
mkdir build/images
mkdir build/css

# Remove the files we don't need
rm -rf .travis.yml
rm -rf README.md
rm -rf LICENSE
