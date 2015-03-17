#!/bin/bash

# Cleanup the build folder
rm -rf build
mkdir build
mkdir build/javascripts
mkdir build/javascripts/templates
mkdir build/javascripts/libraries
mkdir build/images
mkdir build/css

# Generate Sass
sh tasks/sass.sh

# Generate JavaScript
sh tasks/javascripts.sh

# Generate images
sh tasks/images.sh
