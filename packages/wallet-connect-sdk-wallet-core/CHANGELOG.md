# Change Log - @cityofzion/wallet-connect-sdk-wallet-core

This log was last generated on Thu, 28 Sep 2023 13:38:24 GMT and should not be manually modified.

## 3.0.0
Thu, 28 Sep 2023 13:38:24 GMT

### Breaking changes

- Fix problems with Neonjs import and export WalletConnect types
- The very first release

### Minor changes

- Compatibility version feature in connection and request flow 
- Changes on WcWalletSDK constructor signature, the `methods` option is now mandatory

### Patches

- New method in adapter to accept a signingCallback
- update WcSdk with new neo3-signer/neon-signer for: new signMessage version to allow signing without salt
- Downgrade neonjs to fix build problems in react native and consume new version of wallet-connect-sdk-core
- Change abstract adapter name and fix bug in rejectProposal function
- Consume new version of core, neo3-invoker and neo3-signer
- Consume version 1.5.1 of neon-invoker and neo3-invoker
- Adjust version number with the other packages
- Fix problem in the execution speed of the adapter method
- New encryption methods: The encrypt, decrypt, and encrypt From Array methods have been implemented
- Consume new version of neon-dappkit

