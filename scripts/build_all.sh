# exit when any command fails
set -e

function build {
	echo "=====$1====="
	cd $1
	pwd
	echo "Removing 'dist' folder..."
	rm -rf dist
	echo "Removing 'node_modules' folder..."
	#rm -rf node_modules
	rm -f package-lock.json
	echo "Installing dependencies..."
	#npm i
	echo "Building..."
	npm run build
	echo "Fixing package.json..."
	sed -i 's/file:/file:\.\.\//g' dist/package.json
	echo "Testing..."
	npm run test
	cd ..
}
cd ../packages
#build utils
build core
#build analyzer
#build midi