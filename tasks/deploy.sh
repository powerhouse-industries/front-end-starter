#!/bin/bash

# Cleanup the build folder
rm -rf build
mkdir build
mkdir build/javascripts
mkdir build/javascripts/templates
mkdir build/javascripts/libraries
mkdir build/images
mkdir build/css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Generate Sass
sh tasks/sass.sh
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Generate JavaScript
sh tasks/javascripts.sh
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Optimise images
sh tasks/images.sh
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Check HTML
sh tasks/html.sh
echo "$(tput setaf 2)Done!$(tput sgr 0)"
