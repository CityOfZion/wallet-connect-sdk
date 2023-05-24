<p align="center">
  <img
    src="https://raw.githubusercontent.com/CityOfZion/wallet-connect-sdk/main/.github/resources/images/coz.png"
    width="200px;">
</p>

<p align="center">
  WalletConnect 2.0 React SDK Wallet-side for Neo
  <br/> Made by <b>COZ.IO</b>
</p>

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Important information](#important-information)
- [Code examples](#code-examples)
- [Using WITHOUT React.js](https://www.npmjs.com/package/@cityofzion/wallet-connect-sdk-wallet-core)

## Installation

Install the dependencies on your application

### NPM

```
npm i @cityofzion/wallet-connect-sdk-wallet-react
```

### YARN

```
yarn add @cityofzion/wallet-connect-sdk-wallet-react
```

## Setup

Before starting the development, you need to create an account on [Wallet Connect website](https://walletconnect.com/)
and then create a new `Project`, it's super easy, with just a few fields on the form.

Wrap WalletConnectWalletProvider around your App and declare the options

```tsx
import { WalletConnectWalletProvider, TOptions } from '@cityofzion/wallet-connect-sdk-wallet-react'

const options: TOptions = {
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
}

ReactDOM.render(
  <>
    <WalletConnectWalletProvider option={options}>
      <App />
    </WalletConnectWalletProvider>
  </>,
  document.getElementById('root')
)
```

## Usage

From now on, every time you need to use WalletConnect, you can simply use the `useWalletConnectWallet` hook:

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const context = useWalletConnectWallet()
  // do something
}
```

## Important information

When some request arrives, we use an adapter to really do the rpc request and returns the result. So registering the adapter
is mandatory for requests flow and follow the adapter interface is also mandatory.

You can extend our abstract adapter or create your own. To extend, use the `WalletConnectNeo3Adapter` class or create your own
that implements the `IWalletConnectAdapter` interface.

There are two ways to pass your adapter to sdk.

Passing in the sdk constructor.

```ts
import { WalletConnectWalletProvider, TOptions } from '@cityofzion/wallet-connect-sdk-wallet-react'

const options: TOptions = {
  clientOptions: {}, // SignClient options
  methods: ['methods', 'to', 'authorize'],
  adapter: new YourAdapter(),
}

ReactDOM.render(
  <>
    <WalletConnectWalletProvider option={options}>
      <App />
    </WalletConnectWalletProvider>
  </>,
  document.getElementById('root')
)
```

Or, call the setAdapter function from Context.

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { setAdapter } = useWalletConnectWallet()

  async function handleSomething() {
    setAdapter(new YourAdapter())
  }
}
```

By default, the sdk won't ask authorization for some request methods, you are able to switch what methods it will happens:

```ts
import { WalletConnectWalletProvider, TOptions } from '@cityofzion/wallet-connect-sdk-wallet-react'

const options: TOptions = {
  clientOptions: {}, // SignClient options
  methods: ['methods', 'to', 'authorize'],
  autoAcceptMethods: ['your', 'auto', 'accept', 'methods'],
}

ReactDOM.render(
  <>
    <WalletConnectWalletProvider option={options}>
      <App />
    </WalletConnectWalletProvider>
  </>,
  document.getElementById('root')
)
```

## Code examples

### Connect to the Dapp

Start the process of establishing a new connection. It will create a new proposal that needs to be accepted or rejected.

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { connect } = useWalletConnectWallet()

  async function handleSomething() {
    connect(
      'wc:b3b01e4e9d0c7d2dcebe412687616b39a7020ae647133e95281bd21053bba6cb@2?relay-protocol=irn&symKey=ee83ff49a5374ed46dc07c2dc1242903aba9b28f60f1cf5f5e48540e5b40a7d6&wccv=2'
    )
  }
}
```

### Disconnect from a specific dapp session

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { disconnect, sessions } = useWalletConnectWallet()

  async function handleSomething() {
    const session = sessions[0]
    await disconnect(session)
  }
}
```

### Approve a specific connection proposal

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { approveProposal, proposals } = useWalletConnectWallet()

  async function handleSomething() {
    const proposal = proposals[0]
    await approveProposal(proposal, {
      account: {
        address: 'Account address that wants to connect',
        chain: 'The key of supported chain to which the account belongs',
      },
    })
  }
}
```

### Reject a specific connection proposal

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { rejectProposal, proposals } = useWalletConnectWallet()

  async function handleSomething() {
    const proposal = proposals[0]
    await rejectProposal(proposal)
  }
}
```

### Approve a specific session request

Remembering, you need to register the adapter to this function works

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { approveRequest, requests } = useWalletConnectWallet()

  async function handleSomething() {
    const request = requests[0]
    await approveRequest(request)
  }
}
```

### Reject a specific session request

```ts
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function MyComponent() {
  const { rejectRequest, requests } = useWalletConnectWallet()

  async function handleSomething() {
    const request = requests[0]
    await rejectRequest(request)
  }
}
```
