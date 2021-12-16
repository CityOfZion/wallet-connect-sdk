# WcSdk CORE

## Installation
Install the dependency on your client-side application:
```
npm i @cityofzion/wallet-connect-sdk-core @walletconnect/client@2.0.0-beta.17 @walletconnect/qrcode-modal"@2.0.0-alpha.20 @walletconnect/types@2.0.0-beta.17 @walletconnect/utils@2.0.0-beta.17
```
<small><small>(Or, idk... do your yarn thing 😅)</small></small>

## Setup
Wrap WalletConnectContextProvider around your App by passing an options object as prop:
```jsx
import {WcSdk} from "@cityofzion/wallet-connect-sdk-core";

const wcClient = await WcSdk.initClient(
  "debug", // logger: use debug to show all log information on browser console
  "wss://relay.walletconnect.org" // we are using walletconnect's official relay server
);
```

## Recipes

### Check if the user has a Session and get its Accounts
```js
const session = await WcSdk.getSession(wcClient);

if (session) {
  console.log(WcSdk.getAccountAddress(session)) // print the account address
  console.log(session.state.accounts); // print the accounts (with the chain info)
  console.log(session.peer.metadata); // print the wallet metadata 
}
```

### Connect to the Wallet
```js
import { SessionTypes } from '@walletconnect/types'
import Client from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

WcSdk.subscribeToEvents(wcClient, {
  onProposal: uri => {
    QRCodeModal.open(uri, () => { /* nothing */ })
  }
});

WcSdk.connect(wcClient, {
  chainId: "neo3:testnet", // blockchain and network identifier
  methods: ["invokefunction"], // which RPC methods do you plan to call
  appMetadata: {
    name: "MyApplicationName", // your application name to be displayed on the wallet
    description: "My Application description", // description to be shown on the wallet
    url: "https://myapplicationdescription.app/", // url to be linked on the wallet
    icons: ["https://myapplicationdescription.app/myappicon.png"], // icon to be shown on the wallet
  }
})
```

### Disconnect
```js
await WcSdk.disconnect(wcClient, session);
```

### Make an JSON-RPC call
Every request is made via JSON-RPC. You need to provide a method name that is expected by the wallet and listed on
the `methods` property of the [options object](#setup) as well as some additional `parameters`.

The JSON-RPC format accepts parameters in many formats. The rules on how to construct this request will depend
entirely on the blockchain you are using. The code below is an example of a request constructed for the Neo Blockchain:

```js
const chainId = "neo3:testnet"; // blockchain and network identifier
const resp = await WcSdk.sendRequest(wcClient, session, chainId, {
  method: 'rpcMethod',
  params: ['param', 3, true]
});

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
[here](https://github.com/neo-project/neo/blob/master/src/neo/SmartContract/ContractParameterType.cs).
WcSdk has some special types to facilitate: `Address` and `ScriptHash`.

Check it out:
```js
const scripthash = '0xd2a4cff31913016155e38e474a2c06d08be276cf'; // GAS token
const methodName = 'transfer';

const senderAddress = WcSdk.getAccountAddress(session)

const from = {type: 'Address', value: senderAddress};
const recipient = {type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv'};
const value = {type: 'Integer', value: 100000000};
const args = {type: 'Array', value: []}

const parameters = [from, recipient, value, args];
const resp = await WcSdk.invokeFunction(wcClient, session, scripthash, methodName, parameters);
```

### Calling TestInvoke will not require user acceptance
To retrieve information from a SmartContract without persisting any information on the blockchain you can use `WcSdk.sendRequest` with `testInvoke` as method, but WcSdk
has a shortcut: `walletConnectCtx.testInvoke`.

On the example below we are invoking the `balanceOf` method of the `GAS` token.

Is expected for the Wallets to not ask the user for authorization on testInvoke.

Check it out:
```js
const scripthash = '0xd2a4cff31913016155e38e474a2c06d08be276cf'; // GAS token
const methodName = 'balanceOf';

const address = WcSdk.getAccountAddress(session)

const from = {type: 'Address', value: address};

const parameters = [from];
const resp = await WcSdk.testInvoke(wcClient, session, scripthash, methodName, parameters);
```
