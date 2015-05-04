#!/bin/bash

os=`uname`

# Lint all the .scss files
echo "$(tput setaf 5)Linting Sass...$(tput sgr 0)"
scss-lint source/scss -c .scss-lint.yml
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Compile the scss files
echo "$(tput setaf 5)Generating CSS stylesheets...$(tput sgr 0)"
node-sass source/scss/main.scss --output-style compressed build/css/main.css
node-sass source/scss/print.scss --output-style compressed build/css/print.css
node-sass source/scss/ie8.scss --output-style compressed build/css/ie8.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Add prefixes
echo "$(tput setaf 5)Adding prefixes...$(tput sgr 0)"
autoprefixer build/css/main.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Sort all rules alphabetically – overall it benefits GZIP
echo "$(tput setaf 5)Sorting rules alphabetically...$(tput sgr 0)"
csscomb build/css/*
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Compress the CSS a little more
echo "$(tput setaf 5)Minifying final stylesheets...$(tput sgr 0)"
cssnano build/css/main.css build/css/main.css
cssnano build/css/print.css build/css/print.css
cssnano build/css/ie8.css build/css/ie8.css
cleancss -o build/css/main.css build/css/main.css
cleancss -o build/css/print.css build/css/print.css
cleancss -o build/css/ie8.css build/css/ie8.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Inline critical CSS
sh tasks/html.sh

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'sass-changes' -title 'Sass' -message 'Sass compiled successfully.'
fi
