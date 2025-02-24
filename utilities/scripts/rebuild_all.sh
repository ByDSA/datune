#!/bin/bash
# exit when any command fails
set -e

function dependencies {
	echo "Installing dependencies..."
    rm -rf node_modules
	pnpm i
}

function building {
	echo "Removing 'dist' folder..."
	rm -rf dist
	echo "Building..."
	pnpm build
    cp package.json pnpm-lock.yaml ./dist
    base_dir=$(realpath .)
    dist_dir=$(realpath ./dist)
    sed -i -E "s|\"file:([^\"]+)\"|\"file:$(realpath --relative-to=\"$dist_dir\" \"$base_dir/\1\")\"|g" ./dist/package.json
}

function testing {
	echo "Testing..."
	pnpm test
}

function build {
	echo "=====$1====="
	cd $1
	pwd
	dependencies
	building
	cd ..
}

cd ../../packages
build utils
build core
build core-ext
build analyzer
build midi
build ai
build strings
