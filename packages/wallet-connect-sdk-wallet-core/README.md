<p align="center">
  <img
    src="https://raw.githubusercontent.com/CityOfZion/wallet-connect-sdk/main/.github/resources/images/coz.png"
    width="200px;">
</p>

<p align="center">
  WalletConnect 2.0 wallet-side Core SDK for Neo
  <br/> Made by <b>COZ.IO</b>
</p>

- [Installation](#installation)
- [Setup](#setup)
- [Important information](#important-information)
- [Code examples](#code-examples)
- [Using with React.js](https://www.npmjs.com/package/@cityofzion/wallet-connect-sdk-wallet-react)

## Installation

Install the dependencies on your application

### NPM

```
npm i @cityofzion/wallet-connect-sdk-wallet-core
```

### YARN

```
yarn add @cityofzion/wallet-connect-sdk-core
```

## Setup

Before starting the development, you need to create an account on [Wallet Connect website](https://walletconnect.com/)
and then create a new `Project`, it's super easy, with just a few fields on the form.

Initialize the client:

```ts
import WcWalletSdk from '@cityofzion/wallet-connect-sdk-wallet-core'

const sdk = new WcWalletSDK({
  clientOptions: {
    projectId: '<your wc project id>', // the ID of your project on Wallet Connect website
    relayUrl: 'wss://relay.walletconnect.com', // we are using walletconnect's official relay server
    metadata: {
      name: 'MyApplicationName', // your application name to be displayed on the wallet
      description: 'My Application description', // description to be shown on the wallet
      url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
      icons: ['https://myapplicationdescription.app/myappicon.png'], // icon to be shown on the wallet
    },
  },
})

await sdk.init()
```

## Important information

When some request arrives, we use an adapter to really do the rpc request and returns the result. So registering the adapter
is mandatory for requests flow.

You need extend our abstract adapter. To extend, use the `WalletConnectNeo3Adapter`.

There are two ways to pass your adapter to sdk.

Passing in the sdk constructor.

```ts
const sdk = new WcWalletSDK({
  clientOptions: {}, // SignClient options
  methods: ['methods', 'to', 'authorize'],
  adapter: new YourAdapter(),
})
```

Or, assigning directly to the `sdk.adapter` property.

```ts
const sdk = new WcWalletSDK({
  clientOptions: {}, // SignClient options
  methods: ['methods', 'to', 'authorize'],
})

sdk.adapter = new YourAdapter()
```

By default, the sdk won't ask authorization for some request methods, you are able to switch what methods it will happens:

```ts
const sdk = new WcWalletSDK({
  clientOptions: {}, // SignClient options
  autoAcceptMethods: ['your', 'auto', 'accept', 'methods'],
})
```

### Listen for the property changes

If you need to listen when the sessions, proposals, requests or status change, you can register a listener in the emitter.

```ts
const sdk = new WcWalletSDK({
  clientOptions: {}, // SignClient options
  methods: ['methods', 'to', 'authorize'],
})

sdk.emitter.on('proposals', items => {
  setProposals(items)
})

sdk.emitter.on('sessions', items => {
  setSessions(items)
})

sdk.emitter.on('requests', items => {
  setRequests(items)
})

sdk.emitter.on('status', item => {
  setStatus(item)
})

await sdk.init()
```

## Code examples

### Connect to the Dapp

Start the process of establishing a new connection. It will create a new proposal that needs to be accepted or rejected.

```ts
await sdk.connect(
  'wc:b3b01e4e9d0c7d2dcebe412687616b39a7020ae647133e95281bd21053bba6cb@2?relay-protocol=irn&symKey=ee83ff49a5374ed46dc07c2dc1242903aba9b28f60f1cf5f5e48540e5b40a7d6&wccv=2'
)
```

### Disconnect from a specific dapp session

```ts
const session = sdk.sessions[0]
await sdk.disconnect(session)
```

### Approve a specific connection proposal

```ts
const proposal = sdk.proposals[0]
await sdk.approveProposal(proposal, {
  account: {
    address: 'Account address that wants to connect',
    chain: 'The key of supported chain to which the account belongs',
  },
})
```

### Reject a specific connection proposal

```ts
const proposal = sdk.proposals[0]
await sdk.rejectProposal(proposal)
```

### Approve a specific session request

Remembering, you need to register the adapter to this function works

```ts
const request = sdk.requests[0]
await sdk.approveRequest(request)
```

### Reject a specific session request

```ts
const request = sdk.requests[0]
await sdk.rejectRequest(request)
```
