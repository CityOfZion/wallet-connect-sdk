import React, { useEffect, useState } from 'react'
import { TypeChecker } from '@cityofzion/neon-dappkit-types'
import { NetworkType, useWalletConnect, SignMessageVersion } from '@cityofzion/wallet-connect-sdk-react'
import { dappMethods, networks } from '../Constants'
import 'toastify-js/src/toastify.css'
// @ts-ignore
import Toastify from 'toastify-js'

function HelloWorld() {
  const [dappUri, setDappUri] = useState('')
  const [response, setResponse] = useState('')
  const [hasSession, setHasSession] = useState(false)
  const wcSdk = useWalletConnect()
  const [networkType, setNetworkType] = React.useState<NetworkType>('neo3:testnet')

  useEffect(() => {
    wcSdk.emitter.on('session', (session) => {
      setHasSession(!!session)
    })
    return () => {
      wcSdk.emitter.removeAllListeners()
    }
  }, [wcSdk.emitter])

  const connect = async (): Promise<void> => {
    await wcSdk.connect(networkType, dappMethods)
  }

  const getUri = async (): Promise<void> => {
    const { uri, approval } = await wcSdk.createConnection(networkType, dappMethods)
    if (uri) {
      setDappUri(uri)
      await navigator.clipboard.writeText(uri)
      const session = await approval()
      wcSdk.setSession(session)
    }
  }

  const disconnect = async (): Promise<void> => {
    await wcSdk.disconnect()
  }

  const getMyBalance = async (): Promise<void> => {
    try {
      const resp = await wcSdk.testInvoke({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'balanceOf',
            args: [
              {
                type: 'Hash160',
                value: wcSdk.getAccountAddress() ?? '',
              },
            ],
          },
        ],
        signers: [{ scopes: 1 }],
      })

      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const transferGas = async (): Promise<void> => {
    try {
      const resp = await wcSdk.invokeFunction({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'transfer',
            args: [
              {
                type: 'Hash160',
                value: wcSdk.getAccountAddress() ?? '',
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

      console.log(resp)
      window.alert(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const calculateFee = async (): Promise<void> => {
    try {
      const resp = await wcSdk.calculateFee({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'transfer',
            args: [
              {
                type: 'Hash160',
                value: wcSdk.getAccountAddress() ?? '',
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
      console.log(resp)
      console.log(Number(resp.networkFee) + Number(resp.systemFee) === resp.total)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const transferGasWithExtraFee = async (): Promise<void> => {
    try {
      const resp = await wcSdk.invokeFunction({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'transfer',
            args: [
              {
                type: 'Hash160',
                value: wcSdk.getAccountAddress() ?? '',
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

      console.log(resp)
      window.alert(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const multiInvokeFailing = async (): Promise<void> => {
    try {
      const resp = await wcSdk.invokeFunction({
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
                value: wcSdk.getAccountAddress() ?? '',
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

      console.log(resp)
      window.alert(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const signAndVerify = async (): Promise<void> => {
    if (!wcSdk) return
    try {
      const resp = await wcSdk.signMessage({
        message: 'Your sign message',
        version: SignMessageVersion.DEFAULT,
      })

      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))

      const resp2 = await wcSdk.verifyMessage(resp)

      console.log(resp2)
      setResponse(JSON.stringify(resp2, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const signWithoutSaltAndVerify = async (): Promise<void> => {
    if (!wcSdk) return
    try {
      const resp = await wcSdk.signMessage({
        message: 'Your sign message',
        version: SignMessageVersion.WITHOUT_SALT,
      })

      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))

      const resp2 = await wcSdk.verifyMessage(resp)

      console.log(resp2)
      setResponse(JSON.stringify(resp2, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const verifyFailling = async (): Promise<void> => {
    try {
      const resp = await wcSdk.verifyMessage({
        data: '4fe1b478cf76564b2133bdff9ba97d8a360ce36d0511918931cda207c2ce589dfc07ec5d8b93ce7c3b70fc88b676cc9e08f9811bf0d5b5710a20f10c58191bfb',
        messageHex:
          '010001f05c3733336365623464346538666664633833656363366533356334343938393939436172616c686f2c206d756c65712c206f2062616775697520656820697373756d65726d6f2074616978206c696761646f206e61206d697373e36f3f0000',
        publicKey: '031757edb62014dea820a0b33a156f6a59fc12bd966202f0e49357c81f26f5de34',
        salt: '733ceb4d4e8ffdc83ecc6e35c4498999',
      })

      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const verify = async (): Promise<void> => {
    try {
      const resp = await wcSdk.verifyMessage({
        publicKey: '031757edb62014dea820a0b33a156f6a59fc12bd966202f0e49357c81f26f5de34',
        data: 'aeb234ed1639e9fcc95a102633b1c70ca9f9b97e9592cc74bfc40cbc7fefdb19ae8c6b49ebd410dbcbeec6b5906e503d528e34cd5098cc7929dbcbbaf23c5d77',
        salt: '052a55a8d56b73b342a8e41da3050b09',
        messageHex:
          '010001f0a0303532613535613864353662373362333432613865343164613330353062303965794a68624763694f694a49557a49314e694973496e523563434936496b705856434a392e65794a6c654841694f6a45324e444d304e7a63324e6a4d73496d6c68644349364d5459304d7a4d354d5449324d33302e7253315f73735230364c426778744831504862774c306d7a6557563950686d5448477a324849524f4a4f340000',
      })

      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const traverseIterator = async (): Promise<void> => {
    try {
      const resp = await wcSdk.testInvoke({
        invocations: [
          {
            operation: 'getAllCandidates',
            scriptHash: 'ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5',
            args: [],
          },
        ],
        signers: [{ scopes: 1 }],
      })

      if (!TypeChecker.isStackTypeInteropInterface(resp.stack[0])) throw new Error('Invalid response')

      const sessionId = resp.session as string
      const iteratorId = resp.stack[0].id as string

      const resp2 = await wcSdk.traverseIterator(sessionId, iteratorId, 10)

      console.log(resp2)
      setResponse(JSON.stringify(resp2, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const getWalletInfo = async (): Promise<void> => {
    try {
      const resp = await wcSdk.getWalletInfo()

      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  /**
   * Account WIF used in encrypt, decrypt and decryptFromArray
   * KxF6YMo7JojuEWsPFRhMR5zT8nkwyVMUs1d2ZX3QrRBr1SzLcdi7
   */

  const encrypt = async () => {
    const message = 'Your sign message'
    const publicKeys = ['02dd8169fb780a9cc01d785efc96888f99c39ab671c039acad8f1f646b9f944a0e']
    try {
      const resp = await wcSdk.encrypt(message, publicKeys)
      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
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
      const resp2 = await wcSdk.decrypt(payload)
      console.log({ resp2 })
      window.alert(JSON.stringify(resp2, null, 2))
    } catch (error) {
      onError(error)
    }
  }

  const signMessageEncryptAndDecrypt = async () => {
    const signedMessage = await wcSdk.signMessage({
      message: 'Message to Sign',
      version: SignMessageVersion.DEFAULT,
    })

    const message = 'message to encrypt'
    const publicKeys = [signedMessage.publicKey]
    const encrypted = await wcSdk.encrypt(message, publicKeys)

    try {
      const resp = await wcSdk.decrypt(encrypted[0])
      console.log(resp)
      window.alert(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
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
      const resp2 = await wcSdk.decryptFromArray([payload])
      console.log(resp2)
      window.alert(JSON.stringify(resp2, null, 2))
    } catch (error) {
      onError(error)
    }
  }

  const signTransaction = async () => {
    // invoke this using the payer account (eg.: NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv)
    try {
      const resp = await wcSdk.signTransaction({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'transfer',
            args: [
              // the owner is sending to payer but the payer is paying for the tx
              { type: 'Hash160', value: 'NhGomBpYnKXArr55nHRQ5rzy79TwKVXZbr' }, // owner address
              { type: 'Hash160', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' }, // payer address
              { type: 'Integer', value: '100000000' },
              { type: 'Array', value: [] },
            ],
          },
        ],
        signers: [
          {
            account: 'cc776527da4a34b80f411b0ccb9dffddb38523ae', // payer scripthash
            scopes: 'CalledByEntry',
          },
          {
            account: '857a247939db5c7cd3a7bb14791280c09e824bea', // owner scripthash
            scopes: 'CalledByEntry',
          },
        ],
      })
      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
      // you can grab this response and do an invokeFunction using owner account (eg.: NhGomBpYnKXArr55nHRQ5rzy79TwKVXZbr)
    } catch (e) {
      onError(e)
    }
  }

  const wipeMethods = async () => {
    try {
      const resp = await wcSdk.wipeRequests()
      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const verifySuccessWithContext = async () => {
    try {
      const resp = await wcSdk.withContext("Accept this and your balance goes 'to the moon'!").verifyMessage({
        publicKey: '031757edb62014dea820a0b33a156f6a59fc12bd966202f0e49357c81f26f5de34',
        data: 'aeb234ed1639e9fcc95a102633b1c70ca9f9b97e9592cc74bfc40cbc7fefdb19ae8c6b49ebd410dbcbeec6b5906e503d528e34cd5098cc7929dbcbbaf23c5d77',
        salt: '052a55a8d56b73b342a8e41da3050b09',
        messageHex:
          '010001f0a0303532613535613864353662373362333432613865343164613330353062303965794a68624763694f694a49557a49314e694973496e523563434936496b705856434a392e65794a6c654841694f6a45324e444d304e7a63324e6a4d73496d6c68644349364d5459304d7a4d354d5449324d33302e7253315f73735230364c426778744831504862774c306d7a6557563950686d5448477a324849524f4a4f340000',
      })
      console.log(resp)
      setResponse(JSON.stringify(resp, null, 2))
    } catch (e) {
      onError(e)
    }
  }

  const onError = (error: any) => {
    Toastify({
      text: error.message,
    }).showToast()
  }

  return (
    <div>
      {!wcSdk && <span>Loading...</span>}
      {wcSdk && (
        <div>
          <div>
            <span>The SDK has a session? </span>
            <span data-testid="hello-world__has-session">{String(hasSession)}</span>
          </div>
          {!wcSdk.isConnected() && (
            <>
              <select onChange={(e: any) => setNetworkType(e.target.value)} value={networkType}>
                {Object.keys(networks).map((key) => (
                  <option value={key} key={key}>
                    {networks[key as NetworkType].name}
                  </option>
                ))}
              </select>
              <button data-testid="hello-world__wallet-connect" onClick={connect}>
                Connect
              </button>
              <button data-testid="hello-world__get-uri-button" onClick={getUri}>
                Get URI
              </button>
              <br></br>
              <span>URI:</span>
              <br></br>
              <span data-testid="hello-world__dapp-uri">{dappUri}</span>
            </>
          )}
          {wcSdk.isConnected() && (
            <>
              <button data-testid="hello-world__disconnect" onClick={disconnect}>
                Disconnect
              </button>
              <button data-testid="hello-world__get-my-balance" onClick={getMyBalance}>
                Get My Balance
              </button>
              <button data-testid="hello-world__transfer-gas" onClick={transferGas}>
                Transfer Gas
              </button>
              <button data-testid="hello-world__transfer-gas-with-extra-fee" onClick={transferGasWithExtraFee}>
                Transfer Gas with Extra fee
              </button>
              <button data-testid="hello-world__multi-invoke-failing" onClick={multiInvokeFailing}>
                Multi Invoke Failing
              </button>
              <button data-testid="hello-world__sign-and-verify" onClick={signAndVerify}>
                Sign and Verify Message
              </button>
              <button data-testid="hello-world__sign-without-salt-and-verify" onClick={signWithoutSaltAndVerify}>
                Sign Without Salt and Verify Message
              </button>
              <button data-testid="hello-world__verify-failing" onClick={verifyFailling}>
                Verify Failling
              </button>
              <button data-testid="hello-world__verify" onClick={verify}>
                Verify Success
              </button>
              <button data-testid="hello-world__traverse-iterator" onClick={traverseIterator}>
                Traverse Iterator
              </button>
              <button data-testid="hello-world__get-wallet-info" onClick={getWalletInfo}>
                Get Wallet Info
              </button>
              <button data-testid="hello-world__encrypt" onClick={encrypt}>
                encrypt
              </button>
              <button data-testid="hello-world__decrypt" onClick={decrypt}>
                decrypt
              </button>
              <button
                data-testid="hello-world__sign-message-encrypt-and-decrypt"
                onClick={signMessageEncryptAndDecrypt}
              >
                signMessage, Encrypt And Decrypt
              </button>
              <button data-testid="hello-world__decrypt-from-array" onClick={decryptFromArray}>
                decrypt from array
              </button>
              <button data-testid="hello-world__calculate-fee" onClick={calculateFee}>
                Calculate Fee
              </button>
              <button data-testid="hello-world__sign-transaction" onClick={signTransaction}>
                Sign Transaction
              </button>
              <button data-testid="hello-world__verify-with-context" onClick={verifySuccessWithContext}>
                Verify Success With Context
              </button>
              <button data-testid="hello-world__wipe-methods" onClick={wipeMethods}>
                Wipe Methods
              </button>
              <br></br>
              <span>Response:</span>
              <br></br>
              <span data-testid="hello-world__method-response">{response}</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default HelloWorld
