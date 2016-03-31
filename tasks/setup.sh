#!/bin/bash

# Store platform name
os=`uname`

# Install all dependencies
echo "$(tput setaf 5)Installing dependencies...$(tput sgr 0)"
sudo npm install
sudo npm install nodemon -g
sudo npm install parallelshell -g
sudo npm install jshint -g
sudo npm install jscs -g
sudo npm install jsinspect -g
sudo npm install autoprefixer -g
sudo npm install jscs -g
sudo npm install phantomas -g
sudo npm install postcss-cli -g
sudo npm install htmlhint -g
sudo npm install replace -g
sudo npm install onchange -g
sudo npm install ucss -g
sudo npm install phantomas -g
sudo npm install npm-run-all -g
sudo gem install scss_lint

# Only install terminal notifier on OS X
if [[ "$os" == 'Darwin' ]]; then
  sudo gem install terminal-notifier
fi

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
rm -rf .hound.yml
rm -rf inch.json
rm -rf README.md
rm -rf LICENSE
