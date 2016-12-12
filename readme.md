# [Parity](https://ethcore.io/parity.html) lookup service

[![Join the chat at https://gitter.im/ethcore/parity][gitter-image]][gitter-url] [![GPLv3][license-image]][license-url]

[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/ethcore/parity
[license-image]: https://img.shields.io/badge/license-GPL%20v3-green.svg
[license-url]: https://www.gnu.org/licenses/gpl-3.0.en.html

## Installation

```shell
git clone https://github.com/ethcore/lookup-service.git
cd lookup-service
npm install --production
```

## Usage

1. Create a config file `config/<env>.json`, which partially overrides `config/default.json`.
2. `export NODE_ENV=<env>; node index.js`
