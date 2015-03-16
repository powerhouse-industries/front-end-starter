#!/bin/bash

# Install `bower-installer`
sudo npm install bower-installer -g

# Install all the Bower packages
cd source/javascripts && bower-installer
cd ../../
cd source/scss && bower install
cd ../../

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
