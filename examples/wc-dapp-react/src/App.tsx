import React from 'react'
import './App.css'
import HelloWorld from './components/HelloWorld'
import { WalletConnectProvider } from '@cityofzion/wallet-connect-sdk-react'
import { Buffer } from 'buffer'
// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer
}

function App() {
  return (
    <div className="App">
      <WalletConnectProvider
        autoManageSession={true}
        options={{
          projectId: 'a9ff54e3d56a52230ed8767db4d4a810',
          relayUrl: 'wss://relay.walletconnect.com',
          metadata: {
            name: 'MyApplicationName', // your application name to be displayed on the wallet
            description: 'My Application description', // description to be shown on the wallet
            url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
            icons: ['https://myapplicationdescription.app/myappicon.png'], // icon to be shown on the wallet
          },
        }}
      >
        <HelloWorld />
      </WalletConnectProvider>
    </div>
  )
}

export default App
