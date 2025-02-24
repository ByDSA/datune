#!/bin/bash
set -e

function dependencies {
	echo "Installing dependencies..."
	rm -rf node_modules
	pnpm i --ignore-workspace
}

function building {
	echo "Building..."
	pnpm build

	cp package.json pnpm-lock.yaml ./dist
	sed -i -E 's|"file:\.\./|\"file:\.\./\.\./|g' ./dist/package.json
}

function testing {
	echo "Testing..."
	pnpm test
}

function build {
	echo "=====$1====="
	cd "$1"
	pwd
	if [ "$1" == "strings" ]; then
		lib/install_chevrotain.sh
	fi
	dependencies
	testing
	building
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
