import { BrowserContext } from '@playwright/test'
import ExampleProject from '../models/ExampleProject'
import { connectDappToReactWallet, createNewReactWallet } from '../pageCommonSteps/WalletReactSteps'
import { getDappUri } from '../pageCommonSteps/DappReactSteps'

async function connectGenericDappToNewReactAccount(
  context: BrowserContext,
  dappPage: ExampleProject,
  dappComponentTestId: string,
  walletPage: ExampleProject,
  actionBeforeConnectWallet?: (dappPage: ExampleProject, walletPage: ExampleProject) => Promise<void> | void,
) {
  // Initialize a variable to store the dapp URI
  let dappUri: string | null = null
  // Open the dapp and wallet pages in the browser context
  await dappPage.openPage(context)
  await walletPage.openPage(context)

  if (actionBeforeConnectWallet) await actionBeforeConnectWallet(dappPage, walletPage)

  // Get the URI of the dapp
  dappUri = await getDappUri(dappPage, dappComponentTestId)
  // Create a wallet
  await createNewReactWallet(walletPage)
  // Connect to the dapp
  await connectDappToReactWallet(walletPage, dappUri)
}

export async function connectReactDappToNewReactAccount(
  context: BrowserContext,
  dappPage: ExampleProject,
  walletPage: ExampleProject,
  actionBeforeConnectWallet?: (dappPage: ExampleProject, walletPage: ExampleProject) => Promise<void> | void,
) {
  await connectGenericDappToNewReactAccount(context, dappPage, 'hello-world', walletPage, actionBeforeConnectWallet)
}

export async function connectSvelteDappToNewReactAccount(
  context: BrowserContext,
  dappPage: ExampleProject,
  walletPage: ExampleProject,
  actionBeforeConnectWallet?: (dappPage: ExampleProject, walletPage: ExampleProject) => Promise<void> | void,
) {
  await connectGenericDappToNewReactAccount(context, dappPage, 'page', walletPage, actionBeforeConnectWallet)
}
