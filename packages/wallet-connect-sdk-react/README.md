# WcSdk for React.js

## Installation
Install the dependency on your client-side application:
```
npm i @cityofzion/wallet-connect-sdk-react
```
<small><small>(Or, idk... do your yarn thing 😅)</small></small>

## Setup
Wrap WalletConnectContextProvider around your App passing by an options object as prop
```jsx
import {WalletConnectContextProvider} from "@cityofzion/wallet-connect-sdk-react";

const wcOptions = {
  chainId: "neo3:testnet", // blockchain and network identifier
  logger: "debug", // use debug to show all log information on browser console
  methods: ["invokefunction"], // which RPC methods do you plan to call
  relayServer: "wss://connect.coz.io:443", // which relay server do you want to use, alternatively you can use "wss://relay.walletconnect.org"
  appMetadata: {
    name: "MyApplicationName", // your application name to be displayed on the wallet
    description: "My Application description", // description to be shown on the wallet
    url: "https://myapplicationdescription.app/", // url to be linked on the wallet
    icons: ["https://myapplicationdescription.app/myappicon.png"], // icon to be shown on the wallet
  }
};

ReactDOM.render(
  <>
    <WalletConnectContextProvider options={wcOptions}>
      <App />
    </WalletConnectContextProvider>
  </>,
  document.getElementById("root"),
);
```

## Usage
For now on, everytime you need to use Wallet Connect, you simply import it and call a method:
```ts
import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";

export default function MyComponent() {
  const walletConnectCtx = useWalletConnect()
  // do something
}
```

## Recipes

### Login (Or "Connect Wallet")
On the following example we are showing a "Connect your Wallet" link, when clicked it will show a dialog with the QRCode
and proceed with the connection.

We are going to show "Loading Session" text while the session is loading.

And if the user already has a session it will show a list of connected addresses with a "Disconnect" link.
```jsx
return <>
{walletConnectCtx.loadingSession
  ? "Loading Session"
  : !walletConnectCtx.session ? <a
        onClick={() => walletConnectCtx.connect()}>Connect your Wallet</a>
  : <ul>
            {walletConnectCtx.accounts.map((account) => {
                const [address] = account.split("@");
                return <li key={address}>
                    <span>{walletConnectCtx.session?.peer.metadata.name}</span>
                    <span>{address}</span>
                    <a onClick={walletConnectCtx.disconnect}>Disconnect</a>
                </li>
            })}
    </ul>
}
</>;

```

### Make an JSON-RPC call
Every request is made via JSON-RPC, you need to provide a method name that is expected by the wallet and listed on
the `methods` property of the [options object](#setup), and some additional `parameters`. The JSON-RPC format accepts
parameters in many formats, but depending on the blockchain you are using it might need to follow some rules, check the
next example to see a Neo
```js
const resp = await walletConnectCtx.sendRequest({
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
To invoke a SmartContract method you can use `walletConnectCtx.sendRequest` with `invokefunction` as method, but WcSdk
has a shortcut: `walletConnectCtx.invokeFunction`.

On the example below we are invoking the `transfer` method of the `GAS` token. Neo blockchain expect params with
`{ type, value }` format, and on `type` you should provide one of the types mentioned
[here](https://github.com/neo-project/neo/blob/master/src/neo/SmartContract/ContractParameterType.cs).
But WcSdk has some special types to facilitate: `Address` and `ScriptHash`.

Check it out:
```js
const scripthash = '0xd2a4cff31913016155e38e474a2c06d08be276cf'; // GAS token
const methodName = 'transfer';

const [senderAddress] = walletConnectCtx.accounts[0].split("@")

const from = {type: 'Address', value: senderAddress};
const recipient = {type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv'};
const value = {type: 'Integer', value: 100000000};
const args = {type: 'Array', value: []}

const parameters = [from, recipient, value, args];
const resp = await walletConnectCtx.invokeFunction(scripthash, methodName, parameters);
```