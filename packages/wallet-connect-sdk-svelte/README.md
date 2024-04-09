# WalletConnect SDK Svelte

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)

## Installation

Install the dependencies on your application

### NPM

```
npm i @cityofzion/wallet-connect-sdk-svelte
```

### YARN

```
yarn add @cityofzion/wallet-connect-sdk-svelte
```

## Setup
To begin development, first establish an account on the [Wallet Connect website](https://walletconnect.com/). Next,
generate a new Project. This process is straightforward, requiring only a few form fields.

### Instantiate an object of the WCSDKStore class

```html
<script>
    import { WCSDKStore } from '@cityofzion/wallet-connect-sdk-svelte'
    
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

    const autoManageSession = true
    const wcSdk = new WCSDKStore(wcOptions, autoManageSession)
</script>
```

`autoManageSession` will reload the user's connected session and subscribe to the `disconnect` event. It is `true` by default and if you don't want this at startup, set the second constructor parameter to false and call the `manageSession` method at the correct time.

## Usage
Check this [Usage Guide](https://github.com/CityOfZion/wallet-connect-sdk/blob/main/USAGE_GUIDE.md) to see how to use this SDK on your application.
