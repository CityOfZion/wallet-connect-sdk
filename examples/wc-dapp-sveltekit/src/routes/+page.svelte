<script>
  import { WCSDKStore } from '@cityofzion/wallet-connect-sdk-svelte'
  const wcsdk = new WCSDKStore({
    projectId: 'a9ff54e3d56a52230ed8767db4d4a810',
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
      name: 'MyApplicationName', // your application name to be displayed on the wallet
      description: 'My Application description', // description to be shown on the wallet
      url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
      icons: ['https://myapplicationdescription.app/myappicon.png'], // icon to be shown on the wallet
    },
  })

  const isConnected = wcsdk.isConnected

  const connect = async () => {
    try {
      await wcsdk.connect('neo3:mainnet', ['calculateFee'])
    } catch (error) {
      alert(error.message)
    }
  }

  const disconnect = async () => {
    try {
      await wcsdk.disconnect()
    } catch (error) {
      alert(error.message)
    }
  }

  const calculateFee = async () => {
    try {
      const result = await wcsdk.calculateFee({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'transfer',
            args: [
              {
                type: 'Hash160',
                value: wcsdk.getAccountAddress() ?? '',
              },
              {
                type: 'Hash160',
                value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv',
              },
              {
                type: 'Integer',
                value: '100000000',
              },
              {
                type: 'Array',
                value: [],
              },
            ],
          },
        ],
        signers: [{ scopes: 1 }],
      })
      console.log(result)
      alert(JSON.stringify(result))
    } catch (error) {
      console.log(error)
    }
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
  <h1>Sveltekit Dapp Example</h1>
  <div>
    {#if !$isConnected}
      <button on:click={connect} disabled={$isConnected}>Connect</button>
    {:else}
      <button on:click={disconnect} disabled={!$isConnected}>Disconnect</button>
    {/if}

    <div>
      <button on:click={calculateFee} disabled={!$isConnected}>CalculateFee</button>
    </div>
  </div>
</div>
