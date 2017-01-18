#!/bin/sh

DIR=$(dirname $0)

curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/SimpleRegistry.sol' > $DIR/SimpleRegistry.sol
curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/TokenReg.sol' > $DIR/TokenReg.sol
curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/BadgeReg.sol' > $DIR/BadgeReg.sol
