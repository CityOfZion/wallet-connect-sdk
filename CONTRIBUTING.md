# Contributing to WalletConnect SDK

Thank you for considering contributing to this project! Welcome to the WalletConnect SDK (WcSdk) monorepo (mono repository)! Here you will find the core functionality along with Vanilla(js/ts), React, and Svelte/SvelteKit integrations for managing WalletConnect interactions to the Neo3 ecosystem.

## Table of Contents

- [Project Overview](#project-overview)
   - [Packages](#packages)
   - [Examples](#examples)
   - [E2E](#e2e)
- [Development Environment Setup](#development-environment-setup)
   - [Installing Packages Dependencies](#installing-packages-dependencies)
   - [Building Packages](#building-packages)
   - [Cleaning Rush Js Cash](#cleaning-rush-js-cash)
- [Start the Development](#start-the-development)
- [Adding E2E Tests](#adding-e2e-tests)
- [Formatting code](#formatting-code)
- [GitHooks](#githooks)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Technologies](#technologies)
- [Usage](#usage)

## Project Overview

This repository manages the WalletConnect SDK, which facilitates interactions between digital wallets and decentralized applications (dApps) on the Neo blockchain. Below are the 3 primary directories for project development:

- [Packages](./packages)
- [Examples](./examples)
- [E2E](./e2e)

### Packages

The packages folder contains all the libraries of this mono repository. Each sub-folder within packages represents a different library available on npm. Each library is independent and can be installed separately using npm or yarn. Inside each sub-folder, you will find the necessary files for using the library in your project.

- [wallet-connect-sdk-core](./packages/wallet-connect-sdk-core): Contains the core logic of the WalletConnect SDK.
- [wallet-connect-sdk-react](./packages/wallet-connect-sdk-react): Provides adaptor utilities for integrating wallet-connect-sdk-core functionality into React applications.
- [wallet-connect-sdk-svelte](./packages/wallet-connect-sdk-svelte): Offers adaptor utilities for integrating wallet-connect-sdk-core functionality into Svelte applications.
- [wallet-connect-sdk-wallet-core](./packages/wallet-connect-sdk-wallet-core): Handles the core logic for creating and managing digital wallets on the Neo blockchain.
- [wallet-connect-sdk-wallet-react](./packages/wallet-connect-sdk-wallet-react): Provides adaptor utilities for integrating wallet functionality into React applications specific to the Neo blockchain.

### Examples

In addition to the core packages, the repository also contains examples showcasing how to use the WalletConnect SDK with different frameworks:

- [wc-dapp-react](./examples/wc-dapp-react): React example demonstrating integration with WalletConnect for dApps.
- [wc-dapp-sveltekit](./examples/wc-dapp-sveltekit): SvelteKit example demonstrating integration with WalletConnect for dApps.
- [wc-dapp-vite-vanilla](./examples/wc-dapp-vite-vanilla): Vanilla JavaScript example using Vite demonstrating integration with WalletConnect for dApps.
- [wc-wallet-react](./examples/wc-wallet-react): React example demonstrating integration with WalletConnect for wallet applications.

### E2E

End-to-end (E2E) tests are performed using the examples provided in this repository to ensure the stability and functionality of the WalletConnect SDK across various scenarios. This involves initiating projects in the examples folder before running the tests, guaranteeing a realistic simulation of the production environment.

## Development Environment Setup

Before you start developing this project, make sure you have Node.js and Rush JS installed on your system.

1. Node.js
   - Installation: Ensure you have Node.js installed on your system.
   - Verification: To check the installed version you can type the following command on the terminal:
   ```bash
   node -v
   ```

2. Rush JS
   - Installation: Install Rush JS globally by running the following command on the terminal:
   ```bash
   npm install -g @microsoft/rush
   ```
   - Verification: To verify if Rush JS was installed correctly you can use the following:
   ```bash
   rush -v 
   ```

3. Pnpm
   - Installation: Install PNPM globally by running:
   ```bash
   npm install -g pnpm.
   ```
   - Verification: To verify if Pnpm was installed correctly you can use:
   ```bash
   pnpm -v
   ```

### Installing Packages Dependencies

```bash
rush update
```

### Building Packages

```bash
rush rebuild
```

### Cleaning Rush Js Cash
```bash
rush purge
```

## Start the Development

The typical development process involves:

1. Develop or modify the package.
2. Build the packages.
3. Clean Rush cache.
4. Navigate to the corresponding example folder.
5. Install example project dependencies with ``pnpm i``.
6. Run the example with ``pnpm dev`` or ``pnpm serve`` (check the case on package.json).
7. Test your changes thoroughly.

## Adding E2E Tests

1. Install e2e project dependencies with the command:
    ```bash
    pnpm i
    ```
2. Add necessary IDs on HTML Tags to the example project
3. Write the tests in a ``*.spec.ts`` on [e2e/tests](./e2e/tests) folder
4. Clean examples and rushJs using the command:
   - Unix-based system:
    ```bash
   pnpm ex:clean:unix
    ```
   - Windows:
   ```bash
   pnpm ex:clean:windows
   ```
5. Install examples dependencies:
   - Unix-based system:
    ```bash
   pnpm ex:install:unix
    ```
   - Windows:
   ```bash
   pnpm ex:install:windows
   ```
6. Build examples projects:
   - Unix-based system:
    ```bash
   pnpm ex:install:unix
    ```
   - Windows:
   ```bash
   pnpm ex:build:windows
   ```
7. Run the E2E tests:
   - Opening browser:
    ```bash
   pnpm test
    ```
   - Headless:
   ```bash
   pnpm test:headless
   ```

## Formatting code

For code formatting, use the following commands:

- Validate code formatting:
```bash
rush lint
```

- Format the code according to standards:
```bash
rush format
```

> Due to limitations in RushJs, Prettier has been left in the auto-installer of RushJs. However, ESLint has been configured individually within each package. In case an error occurs stating "eslint is not recognized as a command" while running any of the commands above, it is necessary to install the dependencies of the packages to resolve this issue.

## GitHooks

- In the [``pre-commit``](./common/git-hooks/pre-commit) hook, code formatting is checked.

- In the [``pre-push``](./common/git-hooks/pre-push) hook, it's verified whether the developer has added a changelog message for their changes.

To add a changelog message on your commit/push, follow these steps:

1. **Add Your Changes to Commit:**

   Incorporate your modifications into a commit using a GIT GUI or execute the following command:
    ```bash
   git add .
   ```
2. **Run the Rush Change Command:**

   Use the following command, providing a descriptive message of your alterations, and select the appropriate type of modification:
    ```bash
    rush change
    ```
3. **Include Changelog Files in Commit:**

   Ensure that the changelog files are staged for commit by using a GIT GUI or executing the following command:
    ```bash
    git add common\changes\*
    ```

## GitHub Actions Workflows

- The [``Check Build and Test``](./.github/workflows/check-build-and-test.yml) workflow runs on every pull request to main branch. This workflow checks if a message was added a message on the change log, checks packages are building, and runs E2E tests.

- The [``Publish all Wallet Connect Libs (Core, React, Wallet-Core and Wallet-react)``](./.github/workflows/npm-publish.yml) workflow runs on project owner calls, and it publishes the libs into NPMJs.

- The [``AI Code Reviewer``](./.github/workflows/main.yml) workflow runs on every pull request opened or synchronized, and it runs our AI Code Reviewer into your pushed code.

## Technologies

This project uses the following technologies:

- [TypeScript](https://www.typescriptlang.org/) as the main language
- [RushJS](https://rushjs.io/) as the monorepo manager
- [PNPM](https://pnpm.io/) as the package manager
- [ESLint](https://eslint.org/) as the linter
- [Prettier](https://prettier.io/) as the code formatter
- [Prettier](https://prettier.io/) as the code formatter
- [Playwright](https://playwright.dev/) as end-to-end tester

## Usage
Check this [Usage Guide](USAGE_GUIDE.md) to see how to use this SDK on your application.
