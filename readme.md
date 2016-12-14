# [Parity](https://ethcore.io/parity.html) lookup service

**The service is deployed at `https://id.parity.io/` (mainnet) and `https://id.parity.io:8443/` (testnet).**

Also, check out [lookup-service-ui](https://github.com/ethcore/lookup-service-ui) for a GUI.

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

1. Create a config file `config/<env>.json`, which partially overrides `config/default.json`.
2. `export NODE_ENV=<env>; node index.js`

## API

You can lookup an address using the e-mail it has been verified with.

```http
GET /?email=jannis@ethcore.io
```

Or use the address directly.

```http
GET /?address=0x0044f8f0851b544134f88a47f20acc7cf64e7442
```

The result will look like this.

```js
{
  "address": "0x0044f8f0851b544134f88a47f20acc7cf64e7442",
  "badges": [
    {
      "id": 0,
      "address": "0x01e1a37118fe3befd17c426fa962cff2c9099835",
      "name": "smsverification",
      "title": "sms verified",
      "img": "https://raw.githubusercontent.com/ethcore/dapp-assets/1b1beb5/certifications/sms-verification.svg"
    }
    // …
  ],
  "tokens": [
    {
      "TLA": "ETH",
      "name": "Ether",
      "base": "1000000000000000000",
      "img": "https://raw.githubusercontent.com/ethcore/parity/1e6a2cb/js/assets/images/contracts/ethereum-black-64x64.png",
      "balance": "4.860101308978890726"
    }
    // …
  ]
}
```
