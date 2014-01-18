#!/bin/sh

cd ${0%/*} # go to directory of script
dir=${PWD##*/}

echo "Deleting default files"
rm -f ${dir}.css ${dir}.html ${dir}.js

echo "Creating basic structure"
mkdir -p client server public lib collections
touch client/main.html client/main.js
cd client
mkdir -p scripts stylesheets views
cd stylesheets
touch application.css application.scss
cd ../..

echo "Setting up grunt"
mkdir -p .grunt
cd .grunt
if ! [ -f ".gitignore" ]; then
	echo "Downloading .gitignore"
	curl -# -O 'https://raw.github.com/stevezhu/meteor-setup/master/.grunt/.gitignore'
fi
if ! [ -f "package.json" ]; then
	echo "Downloading package.json"
	curl -# -O 'https://raw.github.com/stevezhu/meteor-setup/master/.grunt/package.json'
fi
if ! [ -f "Gruntfile.js" ]; then
	echo "Downloading Gruntfile.js"
	curl -# -O 'https://raw.github.com/stevezhu/meteor-setup/master/.grunt/Gruntfile.js'
fi
sed -i.backup 's/"name": ""/"name": "'$dir'"/' package.json && rm package.json.backup

echo "\nInstalling grunt modules...\n"
npm install

cd ..

echo "\nAdding iron-router..."
mrt add iron-router
