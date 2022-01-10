# WcSdk for React.js

## Installation
Install the dependency on your client-side application:
```
npm i @cityofzion/wallet-connect-sdk-react
```
<small><small>(Or, idk... do your yarn thing 😅)</small></small>

## Setup
Wrap WalletConnectContextProvider around your App by passing an options object as prop
```jsx
import {WalletConnectContextProvider} from "@cityofzion/wallet-connect-sdk-react";

const wcOptions = {
  chains: ["neo3:testnet", "neo3:mainnet"], // the blockchains your dapp accepts to connect
  logger: "debug", // use debug to show all log information on browser console
  methods: ["invokeFunction"], // which RPC methods do you plan to call
  relayServer: "wss://relay.walletconnect.org", // we are using walletconnect's official relay server 
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
From now on, every time you need to use WalletConnect, you simply import it and call a method:
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
```tsx
const connectWallet = async () => {
  await walletConnectCtx.connect()
  // the wallet is connected after the promise is resolved
}

return <>
{walletConnectCtx.loadingSession
  ? "Loading Session"
  : !walletConnectCtx.session ? <a
        onClick={connectWallet}>Connect your Wallet</a>
  : <ul>
            {walletConnectCtx.accounts.map((account) => {
                const [namespace, reference, address] = account.split(":");
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

### Make a JSON-RPC call
very request is made via JSON-RPC. You need to provide a method name that is expected by the wallet and listed on
the `methods` property of the [options object](#setup), and some additional `parameters`.

The JSON-RPC format accepts parameters in many formats. The rules on how to construct this request will depend
entirely on the blockchain you are using. The code below is an example of a request constructed for the Neo Blockchain:

```js
const resp = await walletConnectCtx.sendRequest({
  method: 'rpcMethod',
  params: ['param', 3, true]
});

// the response format depends interely on the blockchain response format
if (resp.result.error && resp.result.error.message) {
    window.alert(resp.result.error.message);
}
```

### Invoking a SmartContract method on Neo Blockchain
To invoke a SmartContract method you can use `walletConnectCtx.sendRequest` with `invokeFunction` as method, but WcSdk
has a shortcut: `walletConnectCtx.invokeFunction`.

On the example below we are invoking the `transfer` method of the `GAS` token. Neo blockchain expect params with
`{ type, value }` format, and on `type` you should provide one of the types mentioned
[here](https://github.com/neo-project/neo/blob/master/src/neo/SmartContract/ContractParameterType.cs).
WcSdk has some special types to facilitate: `Address` and `ScriptHash`.

Check it out:
```js
const senderAddress = walletConnectCtx.getAccountAddress(0) ?? ''

const invocations: ContractInvocation = [{
  scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS Token
  operation: 'transfer',
  args: [
    { type: 'Address', value: senderAddress },
    { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' },
    { type: 'Integer', value: 100000000 },
    { type: 'Array', value: [] }
  ]
}]

const signers: Signer = [{
  scope: WitnessScope.CalledByEntry
}]

const resp = await walletConnectCtx.invokeFunction({invocations, signers});
```


### Calling TestInvoke will not require user acceptance 
To retrieve information from a SmartContract without persisting any information on the blockchain you can use `walletConnectCtx.sendRequest` with `testInvoke` as method, but WcSdk
has a shortcut: `walletConnectCtx.testInvoke`.

On the example below we are invoking the `balanceOf` method of the `GAS` token.

Is expected for the Wallets to not ask the user for authorization on testInvoke.

Check it out:
```js
const targetAddress = walletConnectCtx.getAccountAddress(0) ?? ''

const invocations: ContractInvocation = [{
  scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS Token
  operation: 'balanceOf',
  args: [
    { type: 'Address', value: targetAddress }
  ]
}]

const signers: Signer = [{
  scope: WitnessScope.CalledByEntry
}]

const resp = await walletConnectCtx.testInvoke({invocations, signers});
```
