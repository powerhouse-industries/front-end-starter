#!/bin/bash

# Lint all HTML files
echo "$(tput setaf 3)Linting HTML...$(tput sgr 0)"
htmlhint *.html
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Copy HTML files to the /build folder
echo "$(tput setaf 3)Copying files to /build...$(tput sgr 0)"
cp *.html build
echo "$(tput setaf 2)Done!$(tput sgr 0)"
