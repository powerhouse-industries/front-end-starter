#!/bin/bash

echo "$(tput setaf 2)Analysing CSS...$(tput sgr 0)"
parker build/css/main.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"

echo "$(tput setaf 2)Analysing unused CSS...$(tput sgr 0)"
ucss -h http://localhost:8080/ -c http://localhost:8080/css/main.css -f
echo "$(tput setaf 2)Done!$(tput sgr 0)"

echo "$(tput setaf 2)Analysing HTML...$(tput sgr 0)"
phantomas http://localhost:8080/
echo "$(tput setaf 2)Done!$(tput sgr 0)"
