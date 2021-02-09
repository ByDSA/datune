# exit when any command fails
set -e

function dependencies {
	echo "Removing 'node_modules' folder..."
	rm -rf node_modules
	rm -f package-lock.json
	echo "Installing dependencies..."
	npm i
}

function building {
	echo "Removing 'dist' folder..."
	rm -rf dist
	echo "Building..."
	npm run build
	echo "Fixing package.json..."
	sed -i 's/file:/file:\.\.\//g' dist/package.json
}

function testing {
	echo "Testing..."
	npm run test
}

function build {
	echo "=====$1====="
	cd $1
	pwd
	dependencies
	building
	testing
	cd ..
}

cd ../packages
build utils
build core
build analyzer
build midi
#build ai
