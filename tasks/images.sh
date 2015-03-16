#!/bin/bash

cp -r source/images/template build/images
imageoptim --directory build/images/template
