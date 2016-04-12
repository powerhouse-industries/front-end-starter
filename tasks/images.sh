#!/bin/bash

os=`uname`

# Copy images to the /build folder
echo "$(tput setaf 4)Copying images to /build...$(tput sgr 0)"
cp -r source/images build
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Optimise the images
echo "$(tput setaf 4)Optimising images...$(tput sgr 0)"
imageoptim -d build/images --image-alpha --jpeg-mini -q
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Optimse SVGs
echo "$(tput setaf 4)Optimising SVGs...$(tput sgr 0)"
svgo -f build/images
echo "$(tput setaf 2)Done!$(tput sgr 0)"

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'image-changes' -title 'Images' -message 'Images optimised successfully.'
fi
