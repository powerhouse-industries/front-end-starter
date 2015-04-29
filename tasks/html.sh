#!/bin/bash

# Lint all HTML files
echo "$(tput setaf 3)Linting HTML...$(tput sgr 0)"
htmlhint *.html
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Copy HTML files to the /build folder
echo "$(tput setaf 3)Copying files to /build...$(tput sgr 0)"
cp *.html build
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Optimise HTML files
for f in `ls build/*.html`; do
  echo "$(tput setaf 6)Minifying $f...$(tput sgr 0)"
  html-minifier "$f" -o "$f" --remove-comments --remove-redundant-attributes --remove-empty-attributes --remove-script-type-attributes
done

for f in `ls build/javascripts/templates/*.html`; do
  echo "$(tput setaf 6)Minifying $f...$(tput sgr 0)"
  html-minifier "$f" -o "$f" --remove-comments --remove-redundant-attributes --remove-empty-attributes --remove-script-type-attributes --collapse-whitespace
done
