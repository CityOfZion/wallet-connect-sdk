import ExampleProject from '../models/ExampleProject'
import { ACCOUNT_PASSWORD } from '../constants/GenericData'
import { MAX_RETRIES } from '../constants/DevConstants'

export async function createNewReactWallet(walletPage: ExampleProject) {
  await walletPage.awaitAndClickTestId('account-entry__continue') // Select network
  await walletPage.awaitAndClickTestId('account-entry__create-new-account') // Select to create a new account
  await (await walletPage.awaitAndGetTestId('account-entry__password-input')).fill(ACCOUNT_PASSWORD) // Fill in the password
  await walletPage.awaitAndClickTestId('account-entry__login-or-create') // Finish the account creation
}

export async function connectDappToReactWallet(walletPage: ExampleProject, dappUri: string) {
  await walletPage.page.getByTestId('connect-dapp__dapp-uri-input').focus() // Focus on the input field for the dapp URI
  await walletPage.page.getByTestId('connect-dapp__dapp-uri-input').fill(dappUri.trim()) // Fill in the dapp URI
  await walletPage.awaitAndClickTestId('proposal-card__approve') // Click the approve button
}
export async function acceptPendingRequestToReactWallet(
  walletPage: ExampleProject,
  actionBeforeAcceptMethod?: (walletPage: ExampleProject) => Promise<void> | void,
) {
  let retries = 0
  let requests = []
  do {
    requests = await walletPage.awaitAndGetAllTestId('default-card__pending-request')
    if (requests.length === 0) await walletPage.awaitSeconds(1)
    retries++
  } while (retries < MAX_RETRIES && requests.length == 0)
  if (requests.length === 0) throw Error('No pending requests are found')
  await walletPage.awaitAndClickTestId('default-card__pending-request')
  if (actionBeforeAcceptMethod) await actionBeforeAcceptMethod(walletPage)
  await walletPage.awaitAndClickTestId('request-card__approve')
}
