#!/bin/bash

os=`uname`

# Lint all HTML files
echo "$(tput setaf 3)Linting HTML...$(tput sgr 0)"
htmlhint *.html
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Copy HTML files to the /build folder
echo "$(tput setaf 3)Copying files to /build...$(tput sgr 0)"
cp *.html build
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Inline critical CSS
echo "$(tput setaf 3)Inlining critical CSS...$(tput sgr 0)"
critical build/index.html -w 1200 -h 768 -c build/css/main.css > build/css/critical.css
critical_css=`cat build/css/critical.css`
replace '<!-- critical_css -->' "<style>$critical_css</style>" build/*.html
rm -rf build/css/critical.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Cache busting assets
echo "$(tput setaf 3)Cache busting assets...$(tput sgr 0)"
timestamp=`date +"%d%m%y%H%M%S"`
replace 'cache_buster' "$timestamp" build/*.html
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Optimise HTML files
for f in `ls build/*.html`; do
  echo "$(tput setaf 6)Minifying $f...$(tput sgr 0)"
  html-minifier "$f" -o "$f" --remove-comments --remove-empty-attributes --remove-script-type-attributes
done

for f in `ls build/javascripts/templates/*.html`; do
  echo "$(tput setaf 6)Minifying $f...$(tput sgr 0)"
  html-minifier "$f" -o "$f" --remove-comments --remove-empty-attributes --remove-script-type-attributes --collapse-whitespace
done

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'html-changes' -title 'HTML' -message 'HTML compiled successfully.'
fi
