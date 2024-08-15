# Change Log - @cityofzion/wallet-connect-sdk-wallet-core

This log was last generated on Thu, 15 Aug 2024 20:32:03 GMT and should not be manually modified.

## 4.4.0
Thu, 15 Aug 2024 20:32:03 GMT

### Minor changes

- Support type 2 transactions and add eth_estimateGas method

## 4.3.2
Wed, 14 Aug 2024 19:41:30 GMT

### Patches

- fix error to make a transaction in NeoX using AbstractWalletConnectEIP155Adapter

## 4.3.1
Tue, 13 Aug 2024 16:12:34 GMT

### Patches

- adding eth methods

## 4.3.0
Wed, 24 Jul 2024 22:09:51 GMT

### Minor changes

- Added calculateFee method to AbstractWalletConnectEIP155Adapter

## 4.2.4
Thu, 04 Jul 2024 16:40:05 GMT

### Patches

- Change SignClient to Web3Wallet

## 4.2.3
Thu, 20 Jun 2024 21:41:28 GMT

### Patches

- Update neon-dappkit package version

## 4.2.2
Wed, 19 Jun 2024 20:50:28 GMT

### Patches

- Receive adapter parameters in AbstractWalletConnectEIP155Adapter's getCustomSigner

## 4.2.1
Wed, 19 Jun 2024 20:10:20 GMT

### Patches

- Revert Web3Wallet implementation due to instabilitity in tests. Posponed for a later update

## 4.2.0
Fri, 14 Jun 2024 17:37:16 GMT

### Minor changes

- Add getCustomSigner function to AbstractWalletConnectEIP155Adapter 

## 4.1.5
Thu, 13 Jun 2024 13:03:31 GMT

### Patches

- Swap SignClient with Web3Wallet

## 4.1.4
Wed, 29 May 2024 17:20:40 GMT

### Patches

- Upgrade @walletconnect/sign-client 

## 4.1.3
Mon, 27 May 2024 18:11:27 GMT

### Patches

- Update dependencies

## 4.1.2
Wed, 15 May 2024 17:13:35 GMT

_Version update only_

## 4.1.1
Thu, 02 May 2024 14:02:01 GMT

### Patches

- fix invalid "gas" key error when try to send a transaction

## 4.1.0
Wed, 17 Apr 2024 20:02:56 GMT

### Minor changes

- Implemented wipe methods

## 4.0.2
Wed, 10 Apr 2024 17:22:27 GMT

### Patches

- Dump NeonDappkit version

## 4.0.0
Thu, 01 Feb 2024 21:44:32 GMT

### Breaking changes

- Ethereum support

## 3.1.2
Mon, 27 Nov 2023 20:31:39 GMT

### Patches

- Changed neon-dappkit version to the latest

## 3.1.1
Mon, 27 Nov 2023 17:52:40 GMT

_Version update only_

## 3.1.0
Mon, 06 Nov 2023 13:13:50 GMT

### Minor changes

- New method to allow signing a transaction multiple times by different wallets before invoking it
- A new method has been added so that the wallet can calculate the fee for an invocation
- Changing the type of events  to avoid conflicts with the core

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

