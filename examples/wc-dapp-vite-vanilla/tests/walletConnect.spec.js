import { expect, test } from '@playwright/test'

test('Dapp connect to wallet', async ({context, page}) => {
  await page.goto('/') // Go home page
  await page.waitForTimeout(500) // Await home to load
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByTestId('app__wallet-connect').click() // Click to connect
  ])
  expect(newPage).toBeDefined() // Verify if a new tab is opened
  expect(newPage.url().startsWith("https://neon.coz.io/connect?uri=")).toBe(true) // Verify if the new tab opened Neon Coz Connect.
})
