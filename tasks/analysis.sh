#!/bin/bash

echo "$(tput setaf 2)Analysing CSS...$(tput sgr 0)"
parker build/css/main.css
echo "$(tput setaf 2)Done!$(tput sgr 0)"
