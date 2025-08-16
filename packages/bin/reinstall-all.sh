#!/bin/bash
set -e

function install {
	echo "=====$1====="
	cd "$1"
	pnpm reinstall
	cd ..
}

echo "=====Root====="
pnpm reinstall

install utils
install core
install core-ext
install analyzer
install midi
install ai
install strings
