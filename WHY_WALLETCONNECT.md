# Why WalletConnect?
Almost every dApp needs a user's authentication to send a signed transaction to the blockchain. From minting tokens to
making a simple transfer, users must always sign their transactions whenever the client-side application needs to call a
SmartContract method that requires the user's Account.

Signing a transaction means that, without a solution like WalletConnect's integration, the user would need to trust his
privateKey to the dApp. For obvious reasons, outside of testing environments, this is a huge security issue, as the dApp
could simply use it maliciously, stealing funds or signing something not approved by the user.

From a security perspective, providing your key to an application is a **HUGE** risk.  WalletConnect mitigates this risk
by delegating all transaction signing operations to the user's wallet. Applications are instead given the ability to
communicate directly with the wallet to **request** user's signature.

[WalletConnect](https://walletconnect.org/) is an established solution to tackle this issue, and it's already used by
many dApps and users.