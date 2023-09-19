import { expect, test } from '@playwright/test'

test('Create a new account', async ({page}) => {
  // Variables setup
  const accountPassword = "Password: Not '12345' - because we're not living in 1995!"
  let accountAddress: string | null = null

  // Test
  await page.goto('/') // Go home page
  await page.getByTestId('account-entry__continue').click() // Select network
  await page.getByTestId('account-entry__create-new-account').click() // Select to create new account
  accountAddress = await page.getByTestId('account-entry__account-address').innerHTML() // Get account address
  await page.getByTestId('account-entry__password-input').fill(accountPassword) // Fill the password
  await page.getByTestId('account-entry__login-or-create').click() // Finish account creation
  let ellipseAddress = await page.getByTestId('header__ellipse-address').innerHTML() // Get account address
  let parsedEllipseAddress = ellipseAddress.split('...') // Split ellipse address
  expect(parsedEllipseAddress.length).toBe(2) // Verify if address is ellipsed
  expect(
    accountAddress.startsWith(parsedEllipseAddress[0])
    && accountAddress.endsWith(parsedEllipseAddress[1])
  ) // Verify if the ellipse address corresponds to the account address
    .toBe(true)
})


