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

For React, try out the [**React SDK**](https://www.npmjs.com/package/@cityofzion/wallet-connect-sdk-react).


## Installation
Install the dependency on your client-side application
### NPM
```
npm i @cityofzion/wallet-connect-sdk-core
```
### YARN
To install using **YARN**, you need to add this to your `package.json` before running the command: 
```
  "resolutions": {
    "@walletconnect/client": "2.0.0-beta.17",
    "@walletconnect/jsonrpc-utils": "1.0.0",
    "@walletconnect/qrcode-modal": "2.0.0-alpha.20",
    "@walletconnect/types": "2.0.0-beta.17",
    "@walletconnect/utils": "2.0.0-beta.17"
  }
```
And then:
```
yarn add @cityofzion/wallet-connect-sdk-core
```

## Setup
Initialize the client:
```js
import {WcSdk} from "@cityofzion/wallet-connect-sdk-core";

const wcInstance = new WcSdk()

await wcInstance.initClient(
  "debug", // logger: use 'debug' to show all log information on browser console, use 'error' to show only errors
  "wss://relay.walletconnect.org" // we are using walletconnect's official relay server
);
```
### Subscribe to Wallet Connect events

```js
wcInstance.subscribeToEvents({
    onProposal: (uri: string) => {
        // show the QRCode, you can use @walletconnect/qrcode-modal to do so, but any QRCode presentation is fine
        QRCodeModal.open(uri, () => {})
        // alternatively you can show Neon Wallet Connect's website, which is more welcoming
        window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank').focus();
    },
    onDeleted: () => {
        // here is where you describe a logout callback
        logout()
    }
})
```

### Load any existing connection, it should be called after the initialization, to reestablish connections made previously

```js
await wcInstance.loadSession()
```

## Recipes

### Check if the user has a Session and get its Accounts

```js
if (wcInstance.session) {
  console.log(wcInstance.accountAddress) // print the first connected account address
  console.log(wcInstance.chainId) // print the first connected account chain info
  console.log(wcInstance.session.state.accounts); // print all the connected accounts (with the chain info)
  console.log(wcInstance.session.peer.metadata); // print the wallet metadata
}
```

### Connect to the Wallet
Start the process of establishing a new connection, to be used when there is no `wcInstance.session`
```js
if (!wcInstance.session) {
  await wcInstance.connect({
    chains: ["neo3:testnet", "neo3:mainnet"], // the blockchains your dapp accepts to connect
    methods: [ // which RPC methods do you plan to call
      "invokeFunction",
      "testInvoke",
      "signMessage",
      "verifyMessage"
    ],
    appMetadata: {
      name: "MyApplicationName", // your application name to be displayed on the wallet
      description: "My Application description", // description to be shown on the wallet
      url: "https://myapplicationdescription.app/", // url to be linked on the wallet
      icons: ["https://myapplicationdescription.app/myappicon.png"], // icon to be shown on the wallet
    }
  })
  // the promise will be resolved after the connection is accepted or refused, you can close the QRCode modal here
  QRCodeModal.close()
  // and check if there is a connection
  console.log(wcInstance.session ? 'Connected successfully' : 'Connection refused')
}
```

### Disconnect
It's interesting to have a button to allow the user to disconnect it's wallet, call `disconnect` when this happen:
```js
await wcInstance.disconnect();
```

### Make a JSON-RPC call
Every request is made via JSON-RPC. You need to provide a method name that is expected by the wallet and listed on
the `methods` property of the [options object](#setup) as well as some additional `parameters`.

The JSON-RPC format accepts parameters in many formats. The rules on how to construct this request will depend
entirely on the blockchain you are using. The code below is an example of a request constructed for the Neo Blockchain:

```js
const result = await wcInstance.sendRequest({
  method: 'getapplicationlog',
  params: ['0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c']
})

// the response format depends interely on the blockchain response format
if (resp.result.error && resp.result.error.message) {
    window.alert(resp.result.error.message);
}
```

### Invoking a SmartContract method on Neo Blockchain
To invoke a SmartContract method you can use `WcSdk.sendRequest` with `invokeFunction` as method, but WcSdk
has a shortcut: `WcSdk.invokeFunction`.

On the example below we are invoking the `transfer` method of the `GAS` token. Neo blockchain expect params with
`{ type, value }` format, and on `type` you should provide one of the types mentioned
[here](https://neon.coz.io/wksdk/core/interfaces/Argument.html).
WcSdk has some special types to facilitate: `Address` and `ScriptHash`.

For reference, developers should reference
the contract manifest on the contracts details pages on dora to understand the methods and argument types needed.
For this example: [GAS](https://dora.coz.io/contract/neo3/mainnet/0xd2a4cff31913016155e38e474a2c06d08be276cf)

Check it out:
```ts
const invocation: ContractInvocation = {
  scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS token
  operation: 'transfer',
  args: [
    { type: 'Address', value: wcInstance.accountAddress },
    { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' },
    { type: 'Integer', value: 100000000 },
    { type: 'Array', value: [] }
  ]
}

const signer: Signer = {
  scope: WitnessScope.Global
}

const resp = await wcInstance.invokeFunction(invocation, signer)
```

### Calling TestInvoke will not require user acceptance
To retrieve information from a SmartContract without persisting any information on the blockchain you can use `WcSdk.sendRequest` with `testInvoke` as method, but WcSdk
has a shortcut: `walletConnectCtx.testInvoke`.

On the example below we are invoking the `balanceOf` method of the `GAS` token.

Is expected for the Wallets to not ask the user for authorization on testInvoke.

Check it out:
```ts
const invocation: ContractInvocation = {
  scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS token
    operation: 'balanceOf',
    args: [
       {type: 'Address', value: wcInstance.accountAddress}
    ]
}

const signer: Signer = {
  scopes: WitnessScope.Global
}

const resp = await wcInstance.testInvoke(invocation, signer)

```

## Read the Docs
There is more information on the [documentation website](https://neon.coz.io/wksdk/core/modules.html)
