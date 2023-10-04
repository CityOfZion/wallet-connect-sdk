import ExampleProject from '../models/ExampleProject'
import { ACCOUNT_PASSWORD } from '../constants/GenericData'
import { MAX_RETRIES } from '../constants/DevConstants'

export async function createNewReactWallet(walletPage: ExampleProject) {
  await walletPage.page.getByTestId('account-entry__continue').click() // Select network
  await walletPage.page.getByTestId('account-entry__create-new-account').click() // Select to create a new account
  await walletPage.page.getByTestId('account-entry__password-input').fill(ACCOUNT_PASSWORD) // Fill in the password
  await walletPage.page.getByTestId('account-entry__login-or-create').click() // Finish the account creation
}

export async function connectDappToReactWallet(walletPage: ExampleProject, dappUri: string) {
  await walletPage.page.getByTestId('connect-dapp__dapp-uri-input').focus() // Focus on the input field for the dapp URI
  await walletPage.page.getByTestId('connect-dapp__dapp-uri-input').fill(dappUri.trim()) // Fill in the dapp URI
  await walletPage.awaitSeconds(1) // Wait for 1 second
  await walletPage.page.getByTestId('proposal-card__approve').click() // Click the approve button
  await walletPage.awaitSeconds(1) // Wait for 1 second
}
export async function acceptPendingRequestToReactWallet(walletPage: ExampleProject) {
  let retries = 0
  let requests = []
  do {
    requests = await walletPage.page.getByTestId('default-card__pending-request').all()
    if (requests.length == 0) await walletPage.awaitSeconds(2)
    retries++
  } while (retries < MAX_RETRIES && requests.length == 0)
  if (requests.length == 0) throw Error('No pending requests are found')
  await (await walletPage.page.getByTestId('default-card__pending-request').all())[0].click()
  await walletPage.awaitSeconds(2)
  await walletPage.page.getByTestId('request-card__approve').click()
}
