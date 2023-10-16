import { expect, test } from '@playwright/test'
import { ACCOUNT_PASSWORD } from '../src/constants/GenericData'
import { WALLET_REACT } from '../src/constants/ProjectsDefinitions'

// Test for creating a new account
test('Create a new account', async ({ context }) => {
  // Initialize a variable to store the account address
  let accountAddress: string | null = null

  // Define the wallet page for the React wallet
  const walletPage = WALLET_REACT

  // Open the wallet page
  await walletPage.openPage(context)

  // Click to continue and select the network
  await walletPage.page.getByTestId('account-entry__continue').click()

  // Click to create a new account
  await walletPage.page.getByTestId('account-entry__create-new-account').click()

  // Get the account address from the page
  accountAddress = await walletPage.page.getByTestId('account-entry__account-address').innerHTML()

  // Fill in the account password
  await walletPage.page.getByTestId('account-entry__password-input').fill(ACCOUNT_PASSWORD)

  // Click to finish the account creation
  await walletPage.page.getByTestId('account-entry__login-or-create').click()

  // Get the ellipsed address from the page header
  const ellipseAddress = await walletPage.page.getByTestId('header__ellipse-address').innerHTML()

  // Split the ellipsed address to extract the visible part and the ellipsis
  const parsedEllipseAddress = ellipseAddress.split('...')

  // Verify if the ellipsed address is split into two parts (visible and ellipsis)
  expect(parsedEllipseAddress.length).toBe(2)

  // Verify if the ellipsed address corresponds to the account address
  expect(
    accountAddress.startsWith(parsedEllipseAddress[0]) && accountAddress.endsWith(parsedEllipseAddress[1]),
  ).toBeTruthy()
})
