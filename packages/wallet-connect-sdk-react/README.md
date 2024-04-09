# WalletConnect SDK React

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)

## Installation

Install the dependencies on your application

### NPM

```
npm i @cityofzion/wallet-connect-sdk-react
```

### YARN

```
yarn add @cityofzion/wallet-connect-sdk-react
```

## Setup
To begin development, first establish an account on the [Wallet Connect website](https://walletconnect.com/). Next,
generate a new Project. This process is straightforward, requiring only a few form fields.

### Wrap WalletConnectProvider around your App and declare the options

```jsx
import {WalletConnectProvider} from "@cityofzion/wallet-connect-sdk-react";

const wcOptions = {
    projectId: '<your wc project id>', // the ID of your project on Wallet Connect website
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
    <WalletConnectProvider autoManageSession={true} options={wcOptions}>
      <App />
    </WalletConnectProvider>
  </>,
  document.getElementById("root"),
);
```

The `autoManageSession` will reload the user's connected session and subscribe to the `disconnect` event. If you don't want this on the initialization, set this option as `false` and call the method `manageSession` on the correct moment.

### Access the WalletConnect instance

From now on, every time you need to use WalletConnect, you can simply use the `useWalletConnect` hook:

```ts
import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";

export default function MyComponent() {
  const wcSdk = useWalletConnect()
  // do something
}
```

## Usage
Check this [Usage Guide](https://github.com/CityOfZion/wallet-connect-sdk/blob/main/USAGE_GUIDE.md) to see how to use this SDK on your application.