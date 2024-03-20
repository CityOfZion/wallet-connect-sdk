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

<details>
<summary>👉 For Vite Users</summary>

In the vite.config.ts file you must change the global value like this:
```ts
export default defineConfig({
    //your config here
	define: {
		global: 'globalThis',
        //...
	},
});
```
</details>

## Setup
To begin development, first establish an account on the [Wallet Connect website](https://walletconnect.com/). Next,
generate a new Project. This process is straightforward, requiring only a few form fields.

### Instantiate an object of the WCSDKStore class

```js
// your-store.js
import { writable } from 'svelte/store'
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

const wcSdk = writable(new WCSDKStore(wcOptions, autoManageSession))
```

```js
// +layout.js
import { get } from 'svelte/store'
import { wcSdk } from './<path to your-store.js>'

export const load = async () => {
  await get(wcSdk).waitSdkLoad()
}
```

`autoManageSession` will reload the user's connected session and subscribe to the `disconnect` event. It is `true` by default and if you don't want this at startup, set the second constructor parameter to false and call the `manageSession` method at the correct time.

## Usage
Check this [Usage Guide](../../USAGE_GUIDE.md) to see how to use this SDK on your application.

### ⚠️ `isConnected` method is not reactive

Instead of relying solely on the `isConnected` method, we recommend using the `session` property to enhance reactivity in your Svelte application.

```js
// your-store.js
import { writable } from 'svelte/store'
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

const wcSdk = writable(new WCSDKStore(wcOptions, autoManageSession))
export const isConnected = writable(false)

export async function setupSdk() {
  await get(wcsdk).waitSdkLoad()
  get(wcsdk).onSession((session) => {
    isConnected.set(!!session)
  })
}
```

```js
// +layout.js
import { setupSdk } from './store'

export const load = async () => {
  await setupSdk()
}
```
