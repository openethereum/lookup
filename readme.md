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

You will get a result like this:

```js
{
  address: '0x639ba260535db072a41115c472830846e4e9ad0f',
  name: 'ngotchac',
  badges: [ {
    id: 12,
    address: '0x4A99350b039068fD326a318C599Be2E09E657D4A',
    name: 'emailverification',
    title: 'eMail verified',
    img: 'https://raw.githubusercontent.com/ethcore/dapp-assets/master/certifications/email-verification.svg'
  } ],
  tokens: [
    {
      id: 0,
      address: '0xAde20230C260f1fd46cD70174dd58363929fEa31',
      TLA: 'GOT',
      base: { [String: '1000000'] s: 1, e: 6, c: [ 1000000 ] }, // BigNumber
      name: 'Gotchacoin',
      img: 'http://vignette3.wikia.nocookie.net/farmville2/images/2/26/Baby_Caramel_Pygora_Goat.png/revision/latest?cb=20130201193031',
      balance: '3'
    }, {
      TLA: 'ETH',
      name: 'Ether',
      base: { [String: '1000000000000000000'] s: 1, e: 18, c: [ 10000 ] },
      img: 'https://raw.githubusercontent.com/ethcore/parity/1e6a2cb/js/assets/images/contracts/ethereum-black-64x64.png',
      balance: '12.5245565653765155'
    }
  ]
}
```

Refer to [the example](example/index.js) for more use cases.
