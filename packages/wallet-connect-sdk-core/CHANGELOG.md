# Change Log - @cityofzion/wallet-connect-sdk-core

This log was last generated on Thu, 20 Jun 2024 21:41:28 GMT and should not be manually modified.

## 3.3.4
Thu, 20 Jun 2024 21:41:28 GMT

### Patches

- Update neon-dappkit-types package version

## 3.3.3
Wed, 29 May 2024 17:20:40 GMT

### Patches

- Upgrade @walletconnect/sign-client 

## 3.3.2
Mon, 27 May 2024 18:11:27 GMT

### Patches

- Update dependencies

## 3.3.1
Wed, 15 May 2024 17:13:35 GMT

### Patches

- Implemented a Contextual Messages on WcSdk

## 3.3.0
Wed, 17 Apr 2024 20:02:56 GMT

### Minor changes

- Implemented wipe methods

## 3.2.2
Wed, 10 Apr 2024 17:22:27 GMT

### Patches

- Hotfix an error during the build process using SvelteKit and TurboRepo.
- Fix documentation links on NPM website

## 3.2.0
Mon, 27 Nov 2023 17:52:40 GMT

### Minor changes

- New way to initialize the SDK

## 3.1.0
Mon, 06 Nov 2023 13:13:50 GMT

### Minor changes

- New method to allow signing a transaction multiple times by different wallets before invoking it
- A new method has been added to calculate the fee for a request
- New event emitter has been added to emit changes to the session

## 3.0.0
Thu, 28 Sep 2023 13:38:24 GMT

### Breaking changes

- Using the new version of WalletConnect library, beta 26
- Using the new version of WalletConnect library, beta 100

### Minor changes

- Increase compatibility version, increase neo3-invoker version and improve the docs
- Compatible with Neo3Invoker
- Changes on `connect` method signature, the `methods` argument is now mandatory

### Patches

- Adjust version number with the other packages
- Add types to constants and add a new constant to auto accept methods 
- update WcSdk with new neo3-signer/neon-signer for: new signMessage version to allow signing without salt
- Downgrade neonjs to fix build problems in react-native
- Adjusting version
- Adjust version number with the other packages
- Adjust version number with the other packages
- Fix duplicated wccv in connection uri
- Adjust version number with the other packages
- New encryption methods: The encrypt, decrypt, and encrypt From Array methods have been implemented
- Add encrypt, decrypt and decryptFromArray on method list
- Consume new version of neon-dappkit
- Add options to change the fees on invokeFunction
- allow an optional scriptHash to be used to sign
- compatible with neo3-signer
- Bump walletconnect library version

## 1.6.1
Wed, 26 Jan 2022 19:25:44 GMT

### Patches

- minor updates to documentation

## 1.6.0
Sun, 19 Dec 2021 21:51:42 GMT

### Minor changes

- updates syntax to align with neo native types

## 1.5.0
Fri, 17 Dec 2021 20:05:03 GMT

### Minor changes

- Updates invocation methods to simplify UX

### Patches

- Adds authentication methods
- Documentation Improvements

## 1.4.0
Fri, 05 Nov 2021 21:39:16 GMT

### Minor changes

- updates type for multiinvoke to hoist the signers

## 1.3.0
Tue, 26 Oct 2021 19:56:23 GMT

### Minor changes

- The format for declaring signers was modified, allowing to inform contracts and groups

## 1.2.1
Tue, 26 Oct 2021 17:25:29 GMT

### Patches

- Adds the signature scope parameter to the wallet connect sdk.

## 1.2.0
Mon, 25 Oct 2021 16:11:07 GMT

### Minor changes

- introduces support for multi-invoke requests

