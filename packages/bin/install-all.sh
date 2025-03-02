#!/bin/bash
set -e

function dependencies {
	echo "Installing dependencies..."
	rm -rf node_modules
	pnpm i --ignore-workspace
}

function install {
	echo "=====$1====="
	cd "$1"
	pwd
	dependencies
	cd ..
}

dependencies

install utils
install core
install core-ext
install analyzer
install midi
install ai
install strings
