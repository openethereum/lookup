#!/bin/sh

DIR=$(dirname $0)

solcjs --abi --bin --optimize $DIR/SimpleRegistry.sol -o $DIR
solcjs --abi --bin --optimize $DIR/TokenReg.sol -o $DIR
solcjs --abi --bin --optimize $DIR/BadgeReg.sol -o $DIR
solcjs --abi --bin --optimize $DIR/OprahBadge.sol -o $DIR
