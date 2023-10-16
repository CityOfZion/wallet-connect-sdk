import { BrowserContext } from '@playwright/test'
import ExampleProject from '../models/ExampleProject'
import { connectDappToReactWallet, createNewReactWallet } from '../pageCommonSteps/WalletReactSteps'
import { getReactDappUri } from '../pageCommonSteps/DappReactSteps'

export async function connectReactDappToNewReactAccount(
  context: BrowserContext,
  dappPage: ExampleProject,
  walletPage: ExampleProject,
) {
  // Initialize a variable to store the dapp URI
  let dappUri: string | null = null
  // Open the dapp and wallet pages in the browser context
  await dappPage.openPage(context)
  await walletPage.openPage(context)
  // Get the URI of the dapp
  dappUri = await getReactDappUri(dappPage)
  // Create a wallet
  await createNewReactWallet(walletPage)
  // Connect to the dapp
  await connectDappToReactWallet(walletPage, dappUri)
}
