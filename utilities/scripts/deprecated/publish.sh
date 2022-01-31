echo "Removing dist..."
npm run clean
echo "Remove node_modules..."
rm -rf node_modules
echo "Reinstalling node_modules..."
npm i
echo "Executing tests..."
npm run test
echo "Building..."
npm run build
echo "Deleting mapping..."
find ./dist -name '*.map' -delete
find ./dist -regex '.*\\.\\(js\\|css\\)' -exec sed -i -E '\\/[\\*\\/]#\\ssourceMappingURL=main(\\.[0-9a-f]+)?\\.(css|js)\\.map(\\*\\/)?/g' {} +
echo "Publishing..."
cd dist
npm publish --access public
