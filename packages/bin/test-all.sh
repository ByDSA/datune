#!/bin/bash
set -e

function dependencies {
	echo "Installing dependencies..."
	rm -rf node_modules
	pnpm i --ignore-workspace
}

function check {
	echo "=====$1====="
	cd "$1"
	pwd
	dependencies

	pnpm test

	cd ..
}

dependencies

check utils
check core
check core-ext
check analyzer
check midi
check ai
check strings
