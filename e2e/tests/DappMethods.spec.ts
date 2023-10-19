import { expect, test } from '@playwright/test'
import { DAPP_REACT, WALLET_REACT } from '../src/constants/ProjectsDefinitions'
import { connectReactDappToNewReactAccount } from '../src/helpers/CommonStepsHelper'
import { getAnyFromInnerHTML } from '../src/helpers/CleanerHelper'
import { acceptPendingRequestToReactWallet } from '../src/pageCommonSteps/WalletReactSteps'

test('Create a new account and connect with a dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT

  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  const dappCard = walletPage.page.getByTestId('default-card_sesseion-card') // Get the dapp card element

  // Check if the dapp card element is defined, indicating successful connection
  expect(dappCard).toBeDefined()
})

test('Test Disconnect on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__disconnect').click() // Click on disconnect button
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await dappPage.page.getByTestId('hello-world__dapp-uri').all()
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.length).toBeGreaterThan(0)
})

test('Test Get My balance on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__get-my-balance').click() // Click on get my balance button
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.state).toBeDefined() // Verify if the response returned state
  expect(response.state).toBe('HALT') // Verify if state is HALT
})

test('Test Sign and Verify Message on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__sign-and-verify').click() // Click on sign and verify button
  await acceptPendingRequestToReactWallet(walletPage)
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.publicKey).toBeDefined() // Verify if the response returned publicKey
  expect(response.data).toBeDefined() // Verify if the response returned data
  expect(response.salt).toBeDefined()
  expect(response.messageHex).toBeDefined() // Verify if the response returned messageHex
  await acceptPendingRequestToReactWallet(walletPage)
  const response2 = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response2).toBeDefined() // Verify  if the response had a return
  expect(response2 as boolean).toBeTruthy() // Verify if the response returned true
})

test('Test Sign Without Salt on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__sign-without-salt-and-verify').click() // Click on sign without salt and verify button
  await acceptPendingRequestToReactWallet(walletPage)
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.publicKey).toBeDefined() // Verify if the response returned publicKey
  expect(response.data).toBeDefined() // Verify if the response returned data
  expect(response.messageHex).toBeDefined() // Verify if the response returned messageHex
  await acceptPendingRequestToReactWallet(walletPage)
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response2 = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response2).toBeDefined() // Verify  if the response had a return
  expect(response2 as boolean).toBeTruthy() // Verify if the response returned true
})

test('Test Verify Failing Message on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__verify-failing').click() // Click on verify failing button
  await acceptPendingRequestToReactWallet(walletPage)
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response as boolean).toBeFalsy() // Verify if the response returned false
})

test('Test Traverse Iterator on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__traverse-iterator').click() // Click on traverse iterator button
  await dappPage.awaitSeconds(3) // Wait for 3 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect((response as any[]).length).toBeGreaterThan(1)
})

test('Test Get Wallet Info on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__get-wallet-info').click() // Click on get wallet info button
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.isLedger).toBeDefined() // Verify if the response returned isLedger
})

test('Test Calculate Fee on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__calculate-fee').click() // Click on calculate fee button
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.networkFee).toBeDefined() // Verify if the response returned networkFee
  expect(response.systemFee).toBeDefined() // Verify if the response returned systemFee
  expect(response.total).toBeDefined() // Verify if the response returned total
})

test('Test Sign Transaction on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.page.waitForLoadState('networkidle') // Wait to load request
  await dappPage.awaitSeconds(5) // Wait for 5 seconds
  await dappPage.page.getByTestId('hello-world__sign-transaction').click() // Click on Sign Transaction button
  await acceptPendingRequestToReactWallet(walletPage)
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  const response = await getAnyFromInnerHTML(dappPage.page.getByTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
})
