#!/bin/bash

# Store platform name
os=`uname`

# Install all dependencies
echo "$(tput setaf 5)Installing dependencies...$(tput sgr 0)"
sudo npm install
sudo npm install bower -g
sudo npm install bower-installer -g
sudo npm install nodemon -g
sudo npm install parallelshell -g
sudo npm install jshint -g
sudo npm install jscs -g
sudo npm install autoprefixer -g
sudo npm install jscs -g
sudo npm install phantomas -g
sudo gem install scss-lint

# Only install terminal notifier on OS X
if [[ "$os" == 'Darwin' ]]; then
  sudo gem install terminal-notifier
fi

# Install all the Bower packages
echo "$(tput setaf 4)Installing bower packages...$(tput sgr 0)"
cd source/javascripts && bower-installer
cd ../../
cd source/scss && bower install
cd ../../
rm -rf source/javascripts/components

# Create the `build` folder structure
echo "$(tput setaf 3)Creating /build directories...$(tput sgr 0)"
mkdir build
mkdir build/javascripts
mkdir build/javascripts/templates
mkdir build/javascripts/libraries
mkdir build/images
mkdir build/css

# Remove the files we don't need
echo "$(tput setaf 2)Removing reduntant files...$(tput sgr 0)"
rm -rf .travis.yml
rm -rf README.md
rm -rf LICENSE
