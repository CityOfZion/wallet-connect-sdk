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
npm i @cityofzion/wallet-connect-sdk-core@beta @walletconnect/sign-client@rc @walletconnect/types@rc
```
### YARN
```
yarn add @cityofzion/wallet-connect-sdk-core@beta @walletconnect/sign-client@rc @walletconnect/types@rc
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
By default, the `connect` method will open a new browser tab to help the user to connect with it's wallet, but there is
an optional callback if you prefer to handle the connection URI by yourself:
```ts
await wcSdk.connect('neo3:testnet', (uri) => console.log(uri))
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
import WcSdk, { WitnessScope } from '@cityofzion/wallet-connect-sdk-core'
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
        scope: WitnessScope.Global
    }]
})
```
You can also use this additional options:
- `systemFeeOverride` to choose a specific amount as system fee OR `extraSystemFee` if you simply want to add more value to the minimum system fee.
- `networkFeeOverride` to choose a specific amount as network fee OR `extraNetworkFee` if you simply want to add more value to the minimum network fee.
- `account` inside each `signer` object, it should be the account's scripthash,
otherwise the wallet will use the user's selected account to sign.

Here is a more advanced example:
```ts
import WcSdk, { WitnessScope } from '@cityofzion/wallet-connect-sdk-core'
// ...
const resp = await wcSdk.invokeFunction({
    invocations: [{
        // ...
    }],
    signers: [{
        scope: WitnessScope.Global,
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
import WcSdk, { WitnessScope } from '@cityofzion/wallet-connect-sdk-core'
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
        scopes: WitnessScope.Global
    }]
})

```

### Sign and Verify message
```ts
// 1) sign a message
const mySignedMessage = await this.wcSdk.signMessage({ message: 'My message', version: 2 })

// 2) store these information somewhere

// 3) check later if the message was signed by this account
const valid = await this.wcSdk.verifyMessage(mySignedMessage)
```

## Wallet Connect Registry
After going to production, we really recommend you to register your dApp on the [Wallet Connect website](https://walletconnect.com/).
Differently than the `Project`, which is necessary to use Wallet Connect services, the `Registry` is not mandatory but
lists your dApp on their website and helps Wallet Connect users to know your dApp.

## Read the Docs
There is more information of each method on the [documentation website](https://neon.coz.io/wksdk/core/modules.html)
