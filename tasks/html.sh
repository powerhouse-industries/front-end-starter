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
critical build/index.html -c build/css/main.css > build/css/critical.css
inline_css=`cat build/css/critical.css`
replace '{{ inline_css }}' "<style>$inline_css</style>" build/*.html
rm -rf build/css/critical.css

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
