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
check analyzer
check midi
check ai
check strings
