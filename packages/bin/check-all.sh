#!/bin/bash
set -e

function check {
	cd "$1"

	pnpm check

	cd ..
}

pnpm check

check utils
check core
check core-ext
check midi
check analyzer
check ai
check strings

cd ../examples
pnpm test:errors
