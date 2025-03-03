#!/bin/bash
set -e

function dependencies {
	echo "Installing dependencies..."
	rm -rf node_modules
	pnpm i --ignore-workspace
}

function build {
	echo "=====$1====="
	cd "$1"
	pwd
	dependencies

	pnpm build
	cd ..
}

dependencies

build utils
build core
build core-ext
build analyzer
build midi
build ai
build strings
