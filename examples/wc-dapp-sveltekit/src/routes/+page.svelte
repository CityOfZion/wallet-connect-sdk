<script lang="ts">
  import { get } from 'svelte/store'
  import { WCSDKStore } from '@cityofzion/wallet-connect-sdk-svelte'
  import { SignMessageVersion, TypeChecker } from '@cityofzion/neon-dappkit-types'
  import type { NetworkType } from '@cityofzion/wallet-connect-sdk-core'
  import Toastify from 'toastify-js'

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
  $:session = wcsdk.session
  $:isConnected = !!$session
  let networkTypes: { name: string; network: NetworkType }[] = [
    { name: 'testnet', network: 'neo3:testnet' },
    { name: 'mainnet', network: 'neo3:mainnet' },
    { name: 'private', network: 'neo3:private' },
  ]

  $: response = ''
  $: dappUri = ''
  $: hasSession = false
  wcsdk.emitter.on('session', (session) => {
    hasSession = !!session
  })

  let networlSelectedName: NetworkType = 'neo3:testnet'
  $: networkTypeSelected =
    networkTypes.find(({ network }) => network === networlSelectedName)?.network ?? networkTypes[0].network

  function onError(error: any) {
    console.log(error)
    Toastify({
      text: error.message || error,
    }).showToast()
  }

  function setResponse(resp: any) {
    console.log(resp)
    if (typeof resp === 'object') {
      response = JSON.stringify(resp, null, 2)
    }
    else {
      response = resp
    }
  }

  const connect = async () => {
    try {
      await wcsdk.connect(networkTypeSelected, [
        'invokeFunction',
        'testInvoke',
        'signMessage',
        'verifyMessage',
        'traverseIterator',
        'getWalletInfo',
        'getNetworkVersion',
        'decrypt',
        'encrypt',
        'decryptFromArray',
        'calculateFee',
        'signTransaction',
      ])
    } catch (error) {
      onError(error)
    }
  }

  const disconnect = async () => {
    try {
      await wcsdk.disconnect()
    } catch (error) {
      onError(error)
    }
  }

  const getUri = async () => {
    try {
      const { uri, approval } = await wcsdk.createConnection('neo3:testnet', [
        'invokeFunction',
        'testInvoke',
        'signMessage',
        'verifyMessage',
        'traverseIterator',
        'getWalletInfo',
        'getNetworkVersion',
        'decrypt',
        'encrypt',
        'decryptFromArray',
        'calculateFee',
        'signTransaction',
      ])
      if (uri) {
        await navigator.clipboard.writeText(uri)
        dappUri = uri
        const session = await approval()
        setResponse(session)
      }
    } catch (error) {
      onError(error)
    }
  }

  const getMyBalance = async () => {
    try {
      const resp = await wcsdk.testInvoke({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'balanceOf',
            args: [
              {
                type: 'Hash160',
                value: wcsdk.getAccountAddress() ?? '',
              },
            ],
          },
        ],
        signers: [{ scopes: 1 }],
      })

      setResponse(resp)
    } catch (error) {
      onError(error)
    }
  }

  const transferGas = async () => {
    try {
      const resp = await wcsdk.invokeFunction({
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

      setResponse(resp)
    } catch (error) {
      onError(error)
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
      setResponse(result)
    } catch (error) {
      console.log(error)
    }
  }

  const transferGasWithExtraFee = async () => {
    try {
      const resp = await wcsdk.invokeFunction({
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
        extraSystemFee: 1000000,
        extraNetworkFee: 100000,
      })

      setResponse(resp)
    } catch (error) {
      onError(error)
    }
  }

  const multiInvokeFailing = async () => {
    try {
      const resp = await wcsdk.invokeFunction({
        invocations: [
          {
            scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
            operation: 'verify',
            args: [],
            abortOnFail: true,
          },
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
            abortOnFail: true,
          },
        ],
        signers: [{ scopes: 1 }],
      })

      setResponse(resp)
    } catch (error) {
      onError(error)
    }
  }

  const signAndVerify = async () => {
    try {
      const resp = await wcsdk.signMessage({
        message: 'Your sign message',
        version: SignMessageVersion.DEFAULT,
      })
      setResponse(resp)
      const resp2 = await wcsdk.verifyMessage(resp)
      setResponse(resp2)
    } catch (error) {
      onError(error)
    }
  }

  const signWithoutSaltAndVerify = async () => {
    try {
      const resp = await wcsdk.signMessage({
        message: 'Your sign message',
        version: SignMessageVersion.WITHOUT_SALT,
      })

      setResponse(resp)

      const resp2 = await wcsdk.verifyMessage(resp)

      setResponse(resp2)
    } catch (error) {
      onError(error)
    }
  }

  const verifyFailling = async () => {
    const resp2 = await wcsdk.verifyMessage({
      data: '4fe1b478cf76564b2133bdff9ba97d8a360ce36d0511918931cda207c2ce589dfc07ec5d8b93ce7c3b70fc88b676cc9e08f9811bf0d5b5710a20f10c58191bfb',
      messageHex:
        '010001f05c3733336365623464346538666664633833656363366533356334343938393939436172616c686f2c206d756c65712c206f2062616775697520656820697373756d65726d6f2074616978206c696761646f206e61206d697373e36f3f0000',
      publicKey: '031757edb62014dea820a0b33a156f6a59fc12bd966202f0e49357c81f26f5de34',
      salt: '733ceb4d4e8ffdc83ecc6e35c4498999',
    })

    console.log(resp2)
    alert(JSON.stringify(resp2, null, 2))
  }

  const verify = async () => {
    const resp = await wcsdk.verifyMessage({
      publicKey: '031757edb62014dea820a0b33a156f6a59fc12bd966202f0e49357c81f26f5de34',
      data: 'aeb234ed1639e9fcc95a102633b1c70ca9f9b97e9592cc74bfc40cbc7fefdb19ae8c6b49ebd410dbcbeec6b5906e503d528e34cd5098cc7929dbcbbaf23c5d77',
      salt: '052a55a8d56b73b342a8e41da3050b09',
      messageHex:
        '010001f0a0303532613535613864353662373362333432613865343164613330353062303965794a68624763694f694a49557a49314e694973496e523563434936496b705856434a392e65794a6c654841694f6a45324e444d304e7a63324e6a4d73496d6c68644349364d5459304d7a4d354d5449324d33302e7253315f73735230364c426778744831504862774c306d7a6557563950686d5448477a324849524f4a4f340000',
    })

    console.log(resp)
    alert(JSON.stringify(resp, null, 2))
  }

  const traverseIterator = async (): Promise<void> => {
    const resp = await wcsdk.testInvoke({
      invocations: [
        {
          operation: 'getAllCandidates',
          scriptHash: 'ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5',
          args: [],
        },
      ],
      signers: [{ scopes: 1 }],
    })
    console.log(resp)
    alert(JSON.stringify(resp, null, 2))

    if (!TypeChecker.isStackTypeInteropInterface(resp.stack[0])) throw new Error('Invalid response')

    const sessionId = resp.session as string
    const iteratorId = resp.stack[0].id as string

    const resp2 = await wcsdk.traverseIterator(sessionId, iteratorId, 10)

    console.log(resp2)
    JSON.stringify(resp2, null, 2)
  }

  const getWalletInfo = async (): Promise<void> => {
    const resp = await wcsdk.getWalletInfo()

    console.log(resp)
    alert(JSON.stringify(resp, null, 2))
  }

  /**
   * Account WIF used in encrypt, decrypt and decryptFromArray
   * L49JXyCktmQby7o3oofrxgg6wBqG1NdgkyKYeL9SidJWbq6HFdU2
   */

  const encrypt = async () => {
    const message = 'Your sign message'
    const publicKeys = ['020ee58aa86f645a73042ef81ae09791e907c9c12ae4a5d2e7365aad8ceae08116']
    const resp = await wcsdk.encrypt(message, publicKeys)
    console.log(resp)
    alert(JSON.stringify(resp, null, 2))
  }

  const decrypt = async () => {
    try {
      const payload = {
        cipherText:
          'fcb01b8b9be61a195f7d5cc09e96f341866b2d4cb2e548146f83a7f7f2d6972424d946def236dc9ca8297c994d58f84dfba9d89325049a55dca64e69e8907922',
        dataTag: 'f43335d550f081d345084ea0f9d1207119f93996b4e0cfd6204e0ddccbebeac3',
        ephemPublicKey: '0278bcb970272910a0bbe69061a435586428e87363018bd0616b3ffebd66774ba9',
        randomVector: '1bd2a7e1305a02e3d89dbd277d6272e5',
      }
      const resp = await wcsdk.decrypt(payload)
      setResponse(resp)
    } catch (error) {
      onError(error)
    }
  }

  const signMessageEncryptAndDecrypt = async () => {
    const signedMessage = await wcsdk.signMessage({
      message: 'Message to Sign',
      version: SignMessageVersion.DEFAULT,
    })

    const message = 'message to encrypt'
    const publicKeys = [signedMessage.publicKey]
    const encrypted = await wcsdk.encrypt(message, publicKeys)

    const resp = await wcsdk.decrypt(encrypted[0])
    console.log(resp)
    window.alert(JSON.stringify(resp, null, 2))
  }

  const decryptFromArray = async () => {
    try {
      const payload = {
        cipherText:
          'fcb01b8b9be61a195f7d5cc09e96f341866b2d4cb2e548146f83a7f7f2d6972424d946def236dc9ca8297c994d58f84dfba9d89325049a55dca64e69e8907922',
        dataTag: 'f43335d550f081d345084ea0f9d1207119f93996b4e0cfd6204e0ddccbebeac3',
        ephemPublicKey: '0278bcb970272910a0bbe69061a435586428e87363018bd0616b3ffebd66774ba9',
        randomVector: '1bd2a7e1305a02e3d89dbd277d6272e5',
      }
      const resp2 = await wcsdk.decryptFromArray([payload])
      setResponse(resp2)
    } catch (error) {
      console.log(error)
      onError(error)
    }
  }

  const signTransaction = async () => {
    const resp = await wcsdk.signTransaction({
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
    setResponse(resp)
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
  <h1>Sveltekit Dapp Example</h1>
  <div style="width: 100%;">
    <div>
      <span>The SDK has a session? </span>
      <span data-testid="page__has-session">{String(hasSession)}</span>
    </div>
    {#if !isConnected}
      <div style="display: flex;">
        <select bind:value={networlSelectedName} style="margin-right: 5px;">
          {#each networkTypes as { name, network }}
            <option selected={networlSelectedName === name} value={network}>{name}</option>
          {/each}
        </select>
        <button on:click={connect} disabled={isConnected} style="margin-right: 5px;">Connect</button>
        <button data-testid="page__get-uri-button" on:click={getUri} disabled={isConnected} >getUri</button>
      </div>
      <div data-testid="page__dapp-uri">{dappUri}</div>
    {:else}
      <button data-testid="page__get-disconnect" on:click={disconnect} disabled={!isConnected}>Disconnect</button>
    {/if}

    <div>
      <button on:click={getMyBalance} disabled={!isConnected}>getMyBalance</button>
      <button on:click={transferGas} disabled={!isConnected}>transferGas</button>
      <button on:click={calculateFee} disabled={!isConnected}>CalculateFee</button>
      <button on:click={transferGasWithExtraFee} disabled={!isConnected}>transferGasWithExtraFee</button>
      <button on:click={multiInvokeFailing} disabled={!isConnected}>multiInvokeFailing</button>
      <button on:click={signAndVerify} disabled={!isConnected}>signAndVerify</button>
      <button on:click={signWithoutSaltAndVerify} disabled={!isConnected}>signWithoutSaltAndVerify</button>
      <button on:click={verifyFailling} disabled={!isConnected}>verifyFailling</button>
      <button on:click={verify} disabled={!isConnected}>verify</button>
      <button on:click={traverseIterator} disabled={!isConnected}>traverseIterator</button>
      <button on:click={getWalletInfo} disabled={!isConnected}>getWalletInfo</button>
      <button on:click={encrypt} disabled={!isConnected}>encrypt</button>
      <button on:click={decrypt} disabled={!isConnected}>decrypt</button>
      <button on:click={signMessageEncryptAndDecrypt} disabled={!isConnected}>signMessageEncryptAndDecrypt</button>
      <button on:click={decryptFromArray} disabled={!isConnected}>decryptFromArray</button>
      <button on:click={signTransaction} disabled={!isConnected}>signTransaction</button>
    </div>
    <br/>
    <span>Response:</span>
    <br/>
    <span data-testid="page__method-response">{response}</span>
  </div>
</div>
