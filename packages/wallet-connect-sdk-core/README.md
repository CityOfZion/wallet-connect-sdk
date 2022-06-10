<p align="center">
  <img
    src="https://raw.githubusercontent.com/CityOfZion/wallet-connect-sdk/develop/.github/resources/images/coz.png"
    width="200px;">
</p>

<p align="center">
  WalletConnect 2.0 Core SDK for Neo
  <br/> Made by <b>COZ.IO</b>
</p>

## Documentation
For more documentation check out our [**docs**](https://neon.coz.io/wksdk/core/index.html).

To use with React, try out the [**React SDK**](https://www.npmjs.com/package/@cityofzion/wallet-connect-sdk-react).


## Installation
Install the dependency on your client-side application
### NPM
```
npm i @walletconnect/client@experimental @walletconnect/types@experimental @cityofzion/wallet-connect-sdk-core
```
### YARN
```
yarn add @walletconnect/client@experimental @walletconnect/types@experimental @cityofzion/wallet-connect-sdk-core
```

## Setup
Initialize the client:
```js
import WcSdk from '@cityofzion/wallet-connect-sdk-core'
import SignClient from '@walletconnect/sign-client'

const wcSdk = new WcSdk(await SignClient.init({
    projectId: '<your wc project id>', // retrieve a Project ID here: https://docs.walletconnect.com/2.0/api/project-id
    relayUrl: 'wss://relay.walletconnect.com', // we are using walletconnect's official relay server
    metadata: {
        name: 'MyApplicationName', // your application name to be displayed on the wallet
        description: 'My Application description', // description to be shown on the wallet
        url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
        icons: ['https://myapplicationdescription.app/myappicon.png'] // icon to be shown on the wallet
    }
}))
```
### Manage Session
Just after initializing the client you can call `manageSession`, just once, it will reload the user connected session and other stuff, check the docs for more details.
```js
await wcSdk.manageSession()
```

## Recipes

### Check if the user has a Session and get its Accounts

```js
if (wcSdk.isConnected()) {
  console.log(wcSdk.getAccountAddress()) // print the first connected account address
  console.log(wcSdk.getChainId()) // print the first connected account chain info
  console.log(wcSdk.session.state.accounts); // print all the connected accounts (with the chain info)
  console.log(wcSdk.session.peer.metadata); // print the wallet metadata
}
```

### Connect to the Wallet
Start the process of establishing a new connection, to be used when there is no `wcSdk.session`
```js
if (!wcSdk.isConnected()) {
  await wcSdk.connect()
  // and check if there is a connection
  console.log(wcSdk.isConnected() ? 'Connected successfully' : 'Connection refused')
}
```

### Disconnect
It's interesting to have a button to allow the user to disconnect it's wallet, call `disconnect` when this happen:
```js
await wcSdk.disconnect();
```

### Invoking a SmartContract method on Neo Blockchain
To invoke a SmartContract method you can use `invokeFunction` method.

On the example below we are invoking the `transfer` method of the `GAS` token. Neo blockchain expect params with
`{ type, value }` format, and on `type` you should provide one of the types mentioned
[here](https://neon.coz.io/wksdk/core/interfaces/Argument.html).
WcSdk has some special types to facilitate: `Address` and `ScriptHash`.

For reference, developers should reference
the contract manifest on the contracts details pages on dora to understand the methods and argument types needed.
For this example: [GAS](https://dora.coz.io/contract/neo3/mainnet/0xd2a4cff31913016155e38e474a2c06d08be276cf)

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

### Calling TestInvoke will not require user acceptance
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

## Read the Docs
There is more information on the [documentation website](https://neon.coz.io/wksdk/core/modules.html)
