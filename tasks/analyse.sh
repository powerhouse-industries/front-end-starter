#!/bin/bash

echo 'URL to analyse: '
read url

echo "$(tput setaf 2)Analysing CSS...$(tput sgr 0)"
parker build/css/main.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

echo "$(tput setaf 2)Analysing unused CSS...$(tput sgr 0)"
ucss -h $url -c $url/css/main.css -f
echo "$(tput setaf 2)Done!$(tput sgr 0)"

echo "$(tput setaf 2)Analysing HTML...$(tput sgr 0)"
phantomas $url
echo "$(tput setaf 2)Done!$(tput sgr 0)"
