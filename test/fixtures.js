const {api} = require('./api')

const registryBytecode = require('./bytecodes/registry')
const registryAbi = require('../src/contracts/abi/SimpleRegistry.json')

let account = null
let registry = null

function deploy (abi, bytecode, parameters) {
  return api.eth
    .accounts()
    .then((accounts) => {
      account = accounts[0]

      const contract = api.newContract(abi)
      const options = { from: account, data: bytecode }
      const values = parameters || []

      return contract
        .deployEstimateGas(options, values)
        .then(([gasEst, gas]) => {
          options.gas = gas.toFixed(0)

          const _options = contract._encodeOptions(contract.constructors[0], options, values)
          return api.eth.sendTransaction(_options)
        })
        .then((txhash) => {
          console.log('tx hash', txhash)
          return api.eth.getTransactionReceipt(txhash)
        })
        .then((info) => {
          return info.contractAddress
        })
        .then((address) => {
          console.log('deployed at', address)
          console.log('')
          return address
        })
    })
}

function register (name, data) {
  const hash = api.util.sha3.text(name)

  return registry.fee
    .call({}, [])
    .then((fee) => {
      return registry.reserve.postTransaction({ from: account, value: fee }, [ hash ])
    })
    .then(() => {
      const promises = Object.keys(data).map((key) => {
        const value = data[key]
        const method = ['a'].includes(key.toLowerCase())
          ? 'setAddress'
          : 'setData'

        return registry[method].postTransaction({ from: account }, [ hash, key, value ])
      })

      return Promise.all(promises)
    })
    .then(() => {
      const promises = Object.keys(data).map((key) => {
        return registry.getData.call({}, [ hash, key ])
      })

      return Promise.all(promises)
    })
    .then((savedData) => {
      console.log(`=> registered "${name}" with the following data:`)

      Object.keys(data).map((key, index) => {
        const value = api.util.bytesToHex(savedData[index])

        console.log(`     "${key}": "${value}"`)
      })

      console.log('')
    })
}

function deployAndRegister (abi, bytecode, name) {
  return deploy(abi, bytecode)
    .then((address) => {
      return register('name', { 'A': address })
    })
}

function deployRegister () {
  return deploy(registryAbi, registryBytecode)
    .then((address) => {
      registry = api.newContract(registryAbi, address).instance
      return register('registry', { A: address })
    })
}

function run () {
  return deployRegister()
    .then(() => {
      return register('ngotchac', { A: '0x634bd930e2bf75325bd2288500f0efa5d46d26fe' })
    })
    .then(() => {
      return registry
    })
}

module.exports = {
  deployAndRegister,
  run
}
