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

# Optimise images
sh tasks/images.sh

# Check HTML
sh tasks/html.sh
