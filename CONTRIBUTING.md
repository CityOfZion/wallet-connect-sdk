# Contributing to WalletConnect SDK
Thanks for contributing to WcSdk :)

This is a monorepository for WcSdk Core and WcSdk React managed with rush.

## Setup
1. Install Rush globally:
```
npm install @microsoft/rush -g
```
2. Run the setup script (equal to `npm i` on each of the packages)
```
rush update
```

## Build (equals to `npm run build` on each of the packages)
```
rush rebuild
```

## Before commit
Build the project and run:
```
rush change
```

## Publish on beta
- Build the project
- Increase the version of each package
- Commit
- Go to each of the packages and run:
```
npm publish --tag beta
```

## Depencencies are not installed?
- remove the common/config/npm-shrinkwrap.json file
- run `rush update`
