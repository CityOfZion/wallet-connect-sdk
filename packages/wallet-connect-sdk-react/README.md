<p align="center">
  <img
    src="https://raw.githubusercontent.com/CityOfZion/wallet-connect-sdk/develop/.github/resources/images/coz.png"
    width="200px;">
</p>

<p align="center">
  WalletConnect 2.0 React SDK for Neo
  <br/> Made by <b>COZ.IO</b>
</p>

To use without React, try out the [**Core SDK**](https://www.npmjs.com/package/@cityofzion/wallet-connect-sdk-core).

## Installation
Install the dependency on your client-side application
### NPM
```
npm i @walletconnect/client@experimental @walletconnect/types@experimental @cityofzion/wallet-connect-sdk-react
```
### YARN
```
yarn add @walletconnect/client@experimental @walletconnect/types@experimental @cityofzion/wallet-connect-sdk-react
```

## Setup
Wrap WalletConnectContextProvider around your App and declare the options
```jsx
import {WalletConnectProvider} from "@cityofzion/wallet-connect-sdk-react";

const wcOptions = {
    projectId: '<your wc project id>', // retrieve a Project ID here: https://docs.walletconnect.com/2.0/api/project-id
    relayUrl: 'wss://relay.walletconnect.com', // we are using walletconnect's official relay server
    metadata: {
        name: 'MyApplicationName', // your application name to be displayed on the wallet
        description: 'My Application description', // description to be shown on the wallet
        url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
        icons: ['https://myapplicationdescription.app/myappicon.png'] // icon to be shown on the wallet
    }
};

ReactDOM.render(
  <>
    <WalletConnectContextProvider autoManageSession={true} options={wcOptions}>
      <App />
    </WalletConnectContextProvider>
  </>,
  document.getElementById("root"),
);
```

## Usage
From now on, every time you need to use WalletConnect, you can simply use the `useWalletConnect` hook:
```ts
import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";

export default function MyComponent() {
  const wcSdk = useWalletConnect()
  // do something
}
```

## Recipes

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
  await wcSdk.connect()
  // and check if there is a connection
  console.log(wcSdk.isConnected() ? 'Connected successfully' : 'Connection refused')
}
```

### Disconnect
It's interesting to have a button to allow the user to disconnect its wallet, call `disconnect` when this happens:
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
import {useWalletConnect, WitnessScope} from "@cityofzion/wallet-connect-sdk-react";
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
import {useWalletConnect, WitnessScope} from "@cityofzion/wallet-connect-sdk-react";
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
const mySignedMessage = await wcSdk.signMessage('My message')

// 2) store these information somewhere

// 3) check later if the message was signed by this account
const valid = await wcSdk.verifyMessage(mySignedMessage)
```

