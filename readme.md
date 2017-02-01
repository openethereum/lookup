# [Parity](https://ethcore.io/parity.html) lookup

**Look up details about Ethereum accounts by address, name or e-mail.**

Check out [lookup-service](https://github.com/ethcore/lookup-service) for the web service and [lookup-service-ui](https://github.com/ethcore/lookup-service-ui) for the GUI.

[![Join the chat at https://gitter.im/ethcore/parity][gitter-image]][gitter-url] [![GPLv3][license-image]][license-url]

[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/ethcore/parity
[license-image]: https://img.shields.io/badge/license-GPL%20v3-green.svg
[license-url]: https://www.gnu.org/licenses/gpl-3.0.en.html

## Installation

```shell
npm install --save lookup@ethcore/lookup
```

## Usage

```js
const {Api} = require('@parity/parity.js')

const api = new Api(new Api.Transport.Http('http://localhost:8545'))
api.transport._connectTimeout = -1

const lookup = require('lookup')(api)

lookup
  .byName('ngotchac')
  .then(console.log)
```

Refer to [the example](example/index.js) for more use cases.
