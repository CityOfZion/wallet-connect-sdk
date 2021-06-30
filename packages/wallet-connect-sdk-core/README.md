# WcSdk CORE

## Installation
Install the dependency on your client-side application:
```
npm i @cityofzion/wallet-connect-sdk-core
```
<small><small>(Or, idk... do your yarn thing 😅)</small></small>

## Setup
Wrap WalletConnectContextProvider around your App by passing an options object as prop:
```jsx
import {WcSdk} from "@cityofzion/wallet-connect-sdk-core/lib";

const wcClient = await WcSdk.initClient(
  "debug", // logger: use debug to show all log information on browser console
  "wss://connect.coz.io:443" // relayServer: which relay server do you want to use, alternatively you can use "wss://relay.walletconnect.org"  
);
```

## Recipes

### Check if the user has a Session and get its Accounts
```js
const session = await WcSdk.getSession(wcClient);

if (session) {
  console.log(session.state.accounts); // print the accounts
  console.log(session.peer.metadata); // print the wallet metadata 
}
```

### Connect to the Wallet
```js
WcSdk.subscribeToEvents(wcClient, {
  onProposal: uri => {
    /*
      Open a QRCode Modal using uri
      It's recommended to use "@walletconnect/qrcode-modal"
      calling QRCodeModal.open(uri) and QRCodeModal.close()
     */
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
the `methods` property of the [options object](#setup), and some additional `parameters`.

The JSON-RPC format accepts parameters in many formats. The rules on how to construct this request will depend
entirely on the blockchain you are using. The code below is an example of a request constructed for the Neo Blockchain:

```js
const chainId = "neo3:testnet"; // blockchain and network identifier
const resp = await WcSdk.sendRequest(wcClient, session, chainId, {
  method: 'rpcMethod',
  parameters: ['param', 3, true]
});

// the response format depends interely on the blockchain response format
if (resp.result.error && resp.result.error.message) {
    window.alert(resp.result.error.message);
    return null;
}
```

### Invoking a SmartContract method on Neo Blockchain
To invoke a SmartContract method you can use `WcSdk.sendRequest` with `invokefunction` as method, but WcSdk
has a shortcut: `WcSdk.invokeFunction`.

On the example below we are invoking the `transfer` method of the `GAS` token. Neo blockchain expect params with
`{ type, value }` format, and on `type` you should provide one of the types mentioned
[here](https://github.com/neo-project/neo/blob/master/src/neo/SmartContract/ContractParameterType.cs).
WcSdk has some special types to facilitate: `Address` and `ScriptHash`.

Check it out:
```js
const scripthash = '0xd2a4cff31913016155e38e474a2c06d08be276cf'; // GAS token
const methodName = 'transfer';

const [senderAddress] = session.state.accounts[0].split("@")

const from = {type: 'Address', value: senderAddress};
const recipient = {type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv'};
const value = {type: 'Integer', value: 100000000};
const args = {type: 'Array', value: []}

const parameters = [from, recipient, value, args];
const resp = await WcSdk.invokeFunction(wcClient, session, scripthash, methodName, parameters);
```