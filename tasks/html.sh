#!/bin/bash

# Lint all HTML files
htmlhint *.html

# Copy HTML files to the /build folder
cp *.html build
