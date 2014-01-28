#!/bin/sh

cd ${0%/*} # go to directory of script
dir=${PWD##*/}

# install node
if ! type "node" > /dev/null; then
  sudo apt-get update
  sudo apt-get install -y python-software-properties python g++ make
  sudo apt-get install software-properties-common
  sudo add-apt-repository ppa:chris-lea/node.js
  sudo apt-get update
  sudo apt-get install nodejs
fi

# install meteor
if ! type "meteor" > /dev/null; then
  curl https://install.meteor.com | sh
fi

# install meteorite
if ! type "mrt" > /dev/null; then
  sudo npm install -g meteorite
fi
