<p align="center">
  <img
    src="https://raw.githubusercontent.com/CityOfZion/wallet-connect-sdk/develop/.github/resources/images/coz.png"
    width="200px;">
</p>

<p align="center">
  WalletConnect 2.0 Core SDK for Neo
  <br/> Made by <b>COZ.IO</b>
</p>

- [Installation](#installation)
- [Setup](#setup)
- [Code examples](#code-examples)
- [Wallet Connect Registry](#wallet-connect-registry)
- [Complete documentation of each method](https://neon.coz.io/wksdk/core/index.html)
- [Using with React.js](https://www.npmjs.com/package/@cityofzion/wallet-connect-sdk-react)

## Installation
Install the dependencies on your application
### NPM
```
npm i @cityofzion/wallet-connect-sdk-core @walletconnect/sign-client @walletconnect/types
```
### YARN
```
yarn add @cityofzion/wallet-connect-sdk-core @walletconnect/sign-client @walletconnect/types
```

## Setup
Before starting the development, you need to create an account on [Wallet Connect website](https://walletconnect.com/)
and then create a new `Project`, it's super easy, with just a few fields on the form.

Initialize the client:
```js
import WcSdk from '@cityofzion/wallet-connect-sdk-core'
import SignClient from '@walletconnect/sign-client'

const wcSdk = new WcSdk(await SignClient.init({
    projectId: '<your wc project id>', // the ID of your project on Wallet Connect website
    relayUrl: 'wss://relay.walletconnect.com', // we are using walletconnect's official relay server
    metadata: {
        name: 'MyApplicationName', // your application name to be displayed on the wallet
        description: 'My Application description', // description to be shown on the wallet
        url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
        icons: ['https://myapplicationdescription.app/myappicon.png'] // icon to be shown on the wallet
    }
}))
```
On the previous versions we were using another `relayUrl`, make sure you are using this new URL.

### Manage Session
Just after initializing the client you can call `manageSession`, just once, it will reload the user's connected session and subscribe to the `disconnect` event.
```js
await wcSdk.manageSession()
```

## Code examples

### Check if the user has a Session and get its Accounts

```js
if (wcSdk.isConnected()) {
  console.log(wcSdk.getAccountAddress()) // print the first connected account address
  console.log(wcSdk.getChainId()) // print the first connected account chain info
  console.log(wcSdk.session.namespaces); // print the blockchain dictionary with methods, accounts and events
  console.log(wcSdk.session.peer.metadata); // print the wallet metadata
}
```

### Connect to the Wallet
Start the process of establishing a new connection, to be used when there is no `wcSdk.session`
```js
if (!wcSdk.isConnected()) {
  await wcSdk.connect('neo3:testnet')  // choose between neo3:mainnet, neo3:testnet or neo3:private
  // and check if there is a connection
  console.log(wcSdk.isConnected() ? 'Connected successfully' : 'Connection refused')
}
```
By default, the `connect` method will ask authorization for all methods, but you can be more specific on which methods you want to authorize:
```js
if (!wcSdk.isConnected()) {
  await wcSdk.connect('neo3:testnet', ['invokeFunction', 'testInvoke', 'signMessage', 'verifyMessage'])
  console.log(wcSdk.isConnected() ? 'Connected successfully' : 'Connection refused')
}
```
The `connect` method will open a new browser tab to help the user to connect with its wallet, but instead, you can use
`createConnection` to choose a different behavior, like opening a modal or another website.
```ts
const { uri, approval } = await wcSdk.createConnection('neo3:testnet')
window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank')?.focus() // do whatever you want with the uri
await approval()
console.log(wcSdk.isConnected() ? 'Connected successfully' : 'Connection refused')
```

### Disconnect
It's interesting to have a button to allow the user to disconnect its wallet, call `disconnect` when this happens:
```js
await wcSdk.disconnect();
```

### Invoking a SmartContract method on NEO 3 Blockchain
To invoke a SmartContract method you can use `invokeFunction` method.

Neo blockchain expect params with
`{ type, value }` format, and on `type` you should provide one of the types mentioned
[here](https://neon.coz.io/wksdk/core/interfaces/Argument.html).

WcSdk has some special types to facilitate:
- `Address` (the same thing as `Hash160`)
- `ScriptHash` (the same thing as `Hash160` but transported to the wallet as HexString)

To invoke a SmartContract, it's important to know the argument types of the method, this information can be found on Dora.
On the example below we are invoking the `transfer` method of the [GAS](https://dora.coz.io/contract/neo3/mainnet/0xd2a4cff31913016155e38e474a2c06d08be276cf) token.

Check it out:
```ts
import WcSdk from '@cityofzion/wallet-connect-sdk-core'
// ...
const resp = await wcSdk.invokeFunction({
    invocations: [{
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS token
        operation: 'transfer',
        args: [
            { type: 'Address', value: wcSdk.getAccountAddress() ?? '' },
            { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' },
            { type: 'Integer', value: 100000000 },
            { type: 'Array', value: [] }
        ]
    }],
    signers: [{
        scopes: 'Global'
    }]
})
```
Options for each `signer`:
- `scopes`: to specify which scopes should be used to sign the transaction, [learn more](https://developers.neo.org/docs/n3/foundation/Transactions#scopes). This property accepts them as a string as seen on the examples, or as a number, which can be imported from `WitnessScope` of `neon-js`. 
- `account`: to specify which account's scripthash should be used to sign the transaction, otherwise the wallet will use the user's selected account to sign.
- `allowedContracts`: when the `scopes` property is set as `CustomContracts`, you should use this property to specify which contracts are allowed
- `allowedGroups`: when the `scopes` property is set as `CustomGroups`, you should use this property to specify which groups are allowed
- `rules`: to specify which rules should be used to sign the transaction, [learn more](https://developers.neo.org/docs/n3/foundation/Transactions#witnessrule).

Options for each `invocation`:
- `scriptHash`: the SmartContract ScriptHash
- `operation`: the SmartContract's method name
- `args`: the parameters to be sent to the method, as explained above
- `abortOnFail`: when requesting multiple invocations, you can set `abortOnFail` to true on some invocations so the VM will abort the rest of the calls if this invocation returns `false`

Additional root options:
- `systemFeeOverride`: to choose a specific amount as system fee OR `extraSystemFee` if you simply want to add more value to the minimum system fee.
- `networkFeeOverride`: to choose a specific amount as network fee OR `extraNetworkFee` if you simply want to add more value to the minimum network fee.

Here is a more advanced example:
```ts
import WcSdk from '@cityofzion/wallet-connect-sdk-core'
// ...
const resp = await wcSdk.invokeFunction({
    invocations: [{
        // ...
        abortOnFail: true // if this invocation returns false, the VM will abort the rest of the calls
    },
    {
        // ...
    }],
    signers: [{
        scopes: 'Global',
        account: '857a247939db5c7cd3a7bb14791280c09e824bea', // signer account scripthash
    }],
    extraSystemFee: 1000000, // minimum system fee + 1 GAS
    networkFeeOverride: 3000000 // sending 3 GAS instead of the minimum network fee
})
```

### Calling TestInvoke
To retrieve information from a SmartContract without persisting any information on the blockchain you can use `testInvoke` method.

On the example below we are invoking the `balanceOf` method of the `GAS` token.

Is expected for the Wallets to not ask the user for authorization on testInvoke.

Check it out:
```ts
import WcSdk from '@cityofzion/wallet-connect-sdk-core'
// ...
const resp = await wcSdk.testInvoke({
    invocations: [{
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS token
        operation: 'balanceOf',
        args: [
            {type: 'Address', value: wcSdk.getAccountAddress() ?? ''}
        ]
    }],
    signers: [{
        scopes: 'Global'
    }]
})

```

### Sign and Verify message
```ts
// 1) sign a message
const mySignedMessage = await wcSdk.signMessage({ message: 'My message', version: 2 })

// 2) store these information somewhere

// 3) check later if the message was signed by this account
const valid = await wcSdk.verifyMessage(mySignedMessage)
```

### Traverse iterator
The traverseIterator method allows you to traverse an iterator returned by a SmartContract method.

To use this, your connection must be established with the `traverseIterator` method added.

On the following example we are requesting all default methods and also the traverseIterator method.
```ts
import WcSdk, { DEFAULT_METHODS } from '@cityofzion/wallet-connect-sdk-core'
//...
await wcSdk.connect(networkType, [...DEFAULT_METHODS, 'traverseIterator'])
```

On the following example we are getting all the candidates from the
[NEO token](https://dora.coz.io/contract/neo3/mainnet/ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5) and then traversing the
iterator to get the first 10 items.
```ts
const resp = await wcSdk.testInvoke({
    invocations: [
        {
            operation: "getAllCandidates",
            scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5", // neo token
            args: [],
        },
    ],
    signers: [{ scopes: "CalledByEntry" }],
});

const sessionId = resp.session as string;
const iteratorId = resp.stack[0].id as string;

const resp2 = await wcSdk.traverseIterator(sessionId, iteratorId, 10)
```

## Wallet Connect Registry
After going to production, we really recommend you to register your dApp on the [Wallet Connect website](https://walletconnect.com/).
Differently than the `Project`, which is necessary to use Wallet Connect services, the `Registry` is not mandatory but
lists your dApp on their website and helps Wallet Connect users to know your dApp.

## Read the Docs
There is more information of each method on the [documentation website](https://neon.coz.io/wksdk/core/modules.html)
