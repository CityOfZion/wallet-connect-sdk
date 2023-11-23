# Usage Guide

Before continuing, make sure you followed the [Installation and Setup](README.md#installation-and-setup).

## Check if the user is connected
Before doing anything, you should check if the user is connected, to do so, use the `isConnected` method:
```js
if (wcSdk.isConnected()) {
  console.log(wcSdk.getAccountAddress()) // print the first connected account address
  console.log(wcSdk.getChainId()) // print the first connected account chain info
  console.log(wcSdk.session.namespaces); // print the blockchain dictionary with methods, accounts and events
  console.log(wcSdk.session.peer.metadata); // print the wallet metadata
}
```

## Connect to the Wallet

Start the process of establishing a new connection to be used when there is no `wcSdk.session`. You'll need to specify which methods you want to authorize:

```js
if (!wcSdk.isConnected()) {
  // choose between neo3:mainnet, neo3:testnet or neo3:private, and the methods you want to use
  await wcSdk.connect('neo3:testnet', ['invokeFunction', 'testInvoke', 'signMessage', 'verifyMessage']) 
  // and check if there is a connection
  console.log(wcSdk.isConnected() ? 'Connected successfully' : 'Connection refused')
}
```

The `connect` method will open a new browser tab to help the user to connect with its wallet and save the session state,
but instead, you can use `createConnection` to choose a different behavior, like opening a modal and doing something
different with the session.

```ts
const { uri, approval } = await wcSdk.createConnection('neo3:testnet', ['invokeFunction', 'testInvoke', 'signMessage', 'verifyMessage'])
window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank')?.focus() // do whatever you want with the uri
const session = await approval()
wcSdk.setSession(session)
console.log(session ? 'Connected successfully' : 'Connection refused')
```

## Disconnect

It's interesting to have a button to allow the user to disconnect its wallet, call `disconnect` when this happens:

```js
await wcSdk.disconnect();
```

## Invoking a SmartContract method on NEO 3 Blockchain

To invoke a SmartContract method you can use `invokeFunction` method.

Neo blockchain expect params with `{ type, value }` format. For the `type` you should provide one of the types mentioned
[here](https://neon.coz.io/wksdk/core/interfaces/Argument.html).

WcSdk has some special types to facilitate:

- `Address` (the same thing as `Hash160`)
- `ScriptHash` (the same thing as `Hash160` but transported to the wallet as HexString)

To invoke a SmartContract, it's important to know the argument types of the method, this information can be found on [Dora](https://dora.coz.io/).
On the example below we are invoking the `transfer` method of the [GAS](https://dora.coz.io/contract/neo3/mainnet/0xd2a4cff31913016155e38e474a2c06d08be276cf) token.

Check it out:

```ts
const resp = await wcSdk.invokeFunction({
    invocations: [{
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS token
        operation: 'transfer',
        args: [
            { type: 'Address', value: wcSdk.getAccountAddress() ?? '' },
            { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' },
            { type: 'Integer', value: 100000000 },
            { type: 'Array', value: [] }
        ]
    }],
    signers: [{
        scopes: 'Global'
    }]
})
```

You can also use this additional options:

- `systemFeeOverride` to choose a specific amount as system fee OR `extraSystemFee` if you simply want to add more value to the minimum system fee.
- `networkFeeOverride` to choose a specific amount as network fee OR `extraNetworkFee` if you simply want to add more value to the minimum network fee.
- `account` inside each `signer` object, it should be the account's scripthash,
  otherwise the wallet will use the user's selected account to sign.

Here is a more advanced example:

```ts
const resp = await wcSdk.invokeFunction({
    invocations: [{
        // ...
    }],
    signers: [{
        scopes: 'Global',
        account: '857a247939db5c7cd3a7bb14791280c09e824bea', // signer account scripthash
    }],
    extraSystemFee: 1000000, // minimum system fee + 1 GAS
    networkFeeOverride: 3000000 // sending 3 GAS instead of the minimum network fee
})
```

## Calling TestInvoke

To retrieve information from a SmartContract without persisting any information on the blockchain you can use `testInvoke` method.

On the example below we are invoking the `balanceOf` method of the `GAS` token.

Is expected for the Wallets to not ask the user for authorization on testInvoke.

Check it out:

```ts
const resp = await wcSdk.testInvoke({
    invocations: [{
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf', // GAS token
        operation: 'balanceOf',
        args: [
            {type: 'Address', value: wcSdk.getAccountAddress() ?? ''}
        ]
    }],
    signers: [{
        scopes: 'Global'
    }]
})

```

## Sign and Verify message
The process of signing and then verifying a message is useful to prove that the user owns a specific account and have
truly signed your message, stating he agrees with the content. 
```ts
// 1) sign a message
const mySignedMessage = await wcSdk.signMessage({ message: 'My message', version: 2 })

// 2) store these information somewhere

// 3) check later if the message was signed by this account
const valid = await wcSdk.verifyMessage(mySignedMessage)
```
You can use different **versions**, the default is `2`, but you can use `3` to sign a message without salt, and `1` to use the legacy version.

## Traverse iterator

The traverseIterator method allows you to traverse an iterator returned by a SmartContract method.

To use this, your connection must be established with the `traverseIterator` method added.

On the following example we are requesting all default methods and also the traverseIterator method.

```ts
await wcSdk.connect(networkType, ['traverseIterator'])
```

On the following example we are getting all the candidates from the
[NEO token](https://dora.coz.io/contract/neo3/mainnet/ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5) and then traversing the
iterator to get the first 10 items.

```ts
const resp = await wcSdk.testInvoke({
    invocations: [
        {
            operation: "getAllCandidates",
            scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5", // neo token
            args: [],
        },
    ],
    signers: [{ scopes: "CalledByEntry" }],
});

const sessionId = resp.session as string;
const iteratorId = resp.stack[0].id as string;

const resp2 = await wcSdk.traverseIterator(sessionId, iteratorId, 10)
```

## Encrypt and Decrypt data

```ts
// 1) encrypt data using the public key of the recipient, so only the recipient can decrypt it with his private key
// this method receives an array of public keys, so you can encrypt the data for multiple recipients
// and it returns an array of encrypted messages, one for each recipient public key
const encryptedMessages = wcSdk.encrypt("Data to be encrypted", [recipientPublicKey])

// 2) select which encrypted message you want to use
const encryptedMessage = encryptedMessages[0]

// 3) on the other side, the recipient can decrypt the data using his private key
const messageDecrypted = wcSdk.decrypt(encryptedMessage)
```
On the example above, we used the `decrypt` with a single encrypted message, which is faster, but you can use
`decryptFromArray` to pass multiple encrypted messages, and the recipient will try to decrypt until it finds the correct
one.
```ts
// 1) encrypt data using the public key of many recipients
const encryptedMessages = wcSdk.encrypt("Data to be encrypted", [
    jackPublicKey, rickPublicKey, bobPublicKey
])

// 2) on the other side, one of the recipients can decrypt the data using his private key
const messageDecrypted = wcSdk.decryptFromArray(encryptedMessages)
```
This method is slower than the `decrypt` method, so you should use it only if you are not sure which encrypted message
is the correct one.

### Calculate Fee

It's important to know how much a transaction will cost before invoking.

The `calculateFee` function facilitates this by allowing users to input the same arguments they would use in the
`invokeFunction`. This process yields detailed information about the `networkFee`, `systemFee`, and the aggregate `total`.

See the example below:

```ts
const resp = await wcSdk.calculateFee({
    invocations: [{
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
        operation: 'transfer',
        args: [
            { type: 'Hash160', value: account.address },
            { type: 'Hash160', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' },
            { type: 'Integer', value: '100000000' },
            { type: 'Array', value: [] },
        ],
    }],
    signers: [{ scopes: 'CalledByEntry' }],
})

console.log(resp) // will print an object with `networkFee`, `systemFee` and `total`
```

## Get Wallet Info

To get information about the wallet, such as if it is a Ledger wallet, you can use the `getWalletInfo` method.

To use this, your connection must be established with the `getWalletInfo` method added.

```ts
await wcSdk.connect(networkType, ['getWalletInfo'])
```

On the following example we are getting the wallet info, which is returning `false` because it is not a Ledger wallet.

```ts
const walletInfo = await wcSdk.getWalletInfo()
console.log(walletInfo) // { isLedger: false }
```

## Get Network Version

To get the network version, you can use the `getNetworkVersion` method.

To use this, your connection must be established with the `getNetworkVersion` method added.

```ts
await wcSdk.connect(networkType, ['getNetworkVersion'])
```

On the following example we are getting the network version.

```ts
const networkVersion = await wcSdk.getNetworkVersion()
```

It will return an object like this:

```json
{
  "rpcAddress": "https://mainnet2.neo.coz.io:443",
  "tcpport": 10333,
  "wsport": 10334,
  "nonce": 1708007624,
  "useragent": "/Neo:3.5.0/",
  "protocol": {
    "addressversion": 53,
    "network": 860833102,
    "validatorscount": 7,
    "msperblock": 15000,
    "maxtraceableblocks": 2102400,
    "maxvaliduntilblockincrement": 5760,
    "maxtransactionsperblock": 512,
    "memorypoolmaxtransactions": 50000,
    "initialgasdistribution": 5200000000000000
  }
}
```