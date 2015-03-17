#!/bin/bash

cp -r source/images/template build/images
imagemin build/images/template

terminal-notifier -group 'image-changes' -title 'Images' -message 'Images optimsed successfully.'
