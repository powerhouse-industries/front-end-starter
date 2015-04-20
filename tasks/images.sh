#!/bin/bash

os=`uname`

# Copy images to the /build folder
cp -r source/images/template build/images

# Optimise the images
imagemin build/images/template

# Send a notifcation to the OS
if [[ "$os" == 'Darwin' ]]; then
  terminal-notifier -group 'image-changes' -title 'Images' -message 'Images optimsed successfully.'
fi
