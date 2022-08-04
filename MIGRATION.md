# WalletConnect Migration

- [Introduction](#Introduction)
- [Breaking Changes](#Breaking-Changes)
- [Migration Event](#Migration-Event)
- [The new SDK](#The-new-SDK)
- [Example Dapps](#Example-Dapps)
- [How to Test](#How-to-Test)

## Introduction

As you may know, COZ's WalletConnect SDK is an auxiliary library built to help the usage of WalletConnect protocol. It uses the official WalletConnect library as a dependency and does all the configuration necessary to communicate with Wallets and RPC methods of the Neo Blockchain ecosystem.

However, this was only possible using WalletConnect V2, which is currently in beta stage.

## Breaking Changes

The Wallets and Dapps on Neo ecosystem are using `2.0.0-beta17` version, which is slightly outdated compared to the most recent versions. The choice not to upgrade the SDK was made to prevent breaking compatibility between Wallets and Dapps and to avoid the need of asking developers to change their code. Nonetheless, we knew the migration was inevitable and that eventually, it would have to be done. This moment has arrived.

The newer version is `2.0.0-rc.1`, a release candidate, is supposed to be the last breaking change before the official launch, according to the WalletConnect team. You can check their [release notes](https://gist.github.com/pedrouid/1a36c6a8776e49453838578ec84715e6).

This version introduces many performance and stability improvements and it's of paramount importance that it is applied to Wallets and Dapps to continue using it in production. But in order to get it done successfully and with minimal impact to the users, all the ecosystem needs to take this step together, otherwise dapps and wallets will not be compatible.

## Migration Event

To keep the compatibility between Wallets and Dapps we propose a **Migration Event**, a simple agreement between us all, that a new version of each Wallet and Dapp will release a new version on the same day, and if necessary, ask the users to upgrade their apps to keep using WalletConnect.

- **September 27, 2022**

Before the event we will provide everything necessary to ensure everyone feels safe with the migration.

## The New SDK

We have a new SDK, we simply call it `beta`, you can check its [branch](https://github.com/CityOfZion/wallet-connect-sdk/tree/beta) to see the documentation and understand how to use it.

## Example Dapps

- React (on master branch): https://github.com/melanke/react-dapp-wc-test
    - You can test it here: https://melanke.github.io/react-dapp-wc-test/
- Vue (on beta branch): https://github.com/melanke/vue-dapp-wc-test/tree/beta

## How to Test

Use the new version of Aero Wallet to test your Dapp with the new standards:

https://melanke.github.io/aero-beta/
