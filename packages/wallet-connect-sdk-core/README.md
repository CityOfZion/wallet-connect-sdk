# WalletConnect SDK Core

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)

## Installation

Install the dependencies on your application

### NPM

```
npm i @cityofzion/wallet-connect-sdk-core
```

### YARN

```
yarn add @cityofzion/wallet-connect-sdk-core
```

## Setup
To begin development, first establish an account on the [Wallet Connect website](https://walletconnect.com/). Next,
generate a new Project. This process is straightforward, requiring only a few form fields.

### Initialize the client:

```js
import WcSdk from '@cityofzion/wallet-connect-sdk-core'
import SignClient from '@walletconnect/sign-client'

const wcSdk = await WcSdk.init({
    projectId: '<your wc project id>', // the ID of your project on Wallet Connect website
    relayUrl: 'wss://relay.walletconnect.com', // we are using walletconnect's official relay server
    metadata: {
        name: 'MyApplicationName', // your application name to be displayed on the wallet
        description: 'My Application description', // description to be shown on the wallet
        url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
        icons: ['https://myapplicationdescription.app/myappicon.png'] // icon to be shown on the wallet
    }
})
```

There is another way to initialize the SDK by passing signClient from @walletconnect/sign-client lib as a parameter to the SDK constructor method.

### Manage Session

Just after initializing the client you can call `manageSession`, just once, it will reload the user's connected session and subscribe to the `disconnect` event.

```js
await wcSdk.manageSession()
```

## Usage
Check this [Usage Guide](https://github.com/CityOfZion/wallet-connect-sdk/blob/main/USAGE_GUIDE.md) to see how to use this SDK on your application.


### Read the Docs

There is more information of each method on the [documentation website](https://neon.coz.io/wksdk/core/modules.html)
