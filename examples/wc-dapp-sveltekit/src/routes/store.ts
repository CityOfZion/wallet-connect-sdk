import { WCSDKStore } from '@cityofzion/wallet-connect-sdk-svelte'
import { writable, type Writable, derived, get } from 'svelte/store'

export const wcsdk: Writable<WCSDKStore> = writable<WCSDKStore>(
  new WCSDKStore({
    projectId: 'a9ff54e3d56a52230ed8767db4d4a810',
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
      name: 'MyApplicationName', // your application name to be displayed on the wallet
      description: 'My Application description', // description to be shown on the wallet
      url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
      icons: ['https://myapplicationdescription.app/myappicon.png'], // icon to be shown on the wallet
    },
  }),
)

export const isConnected: Writable<boolean> = writable(false)

export async function setupSdk(): Promise<void> {
  await get(wcsdk).waitSdkLoad()
  get(wcsdk).onSession((session) => {
    isConnected.set(!!session)
  })
}
