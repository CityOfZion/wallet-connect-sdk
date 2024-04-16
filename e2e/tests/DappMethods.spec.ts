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
  const dappCard = await walletPage.awaitAndGetTestId('default-card_sesseion-card') // Get the dapp card element

  // Check if the dapp card element is defined, indicating successful connection
  expect(dappCard).toBeDefined()
})

test('Test Disconnect on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__disconnect') // Click on disconnect button
  await dappPage.awaitTestId('hello-world__dapp-uri')
  const response = await dappPage.awaitAndGetAllTestId('hello-world__dapp-uri')
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.length).toBeGreaterThan(0)
})

test('Test Get My balance on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__get-my-balance') // Click on get my balance button
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.state).toBeDefined() // Verify if the response returned state
  expect(response.state).toBe('HALT') // Verify if state is HALT
})

test('Test Sign and Verify Message on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__sign-and-verify') // Click on sign and verify button
  await acceptPendingRequestToReactWallet(walletPage)
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.publicKey).toBeDefined() // Verify if the response returned publicKey
  expect(response.data).toBeDefined() // Verify if the response returned data
  expect(response.salt).toBeDefined()
  expect(response.messageHex).toBeDefined() // Verify if the response returned messageHex
  await acceptPendingRequestToReactWallet(walletPage)
  const response2 = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response2).toBeDefined() // Verify  if the response had a return
  expect(response2 as boolean).toBeTruthy() // Verify if the response returned true
})

test('Test Sign Without Salt on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__sign-without-salt-and-verify') // Click on sign without salt and verify button
  await acceptPendingRequestToReactWallet(walletPage)
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.publicKey).toBeDefined() // Verify if the response returned publicKey
  expect(response.data).toBeDefined() // Verify if the response returned data
  expect(response.messageHex).toBeDefined() // Verify if the response returned messageHex
  await acceptPendingRequestToReactWallet(walletPage)
  const response2 = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response2).toBeDefined() // Verify  if the response had a return
  expect(response2 as boolean).toBeTruthy() // Verify if the response returned true
})

test('Test Verify Failing Message on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__verify-failing') // Click on verify failing button
  await acceptPendingRequestToReactWallet(walletPage)
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response as boolean).toBeFalsy() // Verify if the response returned false
})

test('Test Traverse Iterator on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__traverse-iterator') // Click on traverse iterator button
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect((response as any[]).length).toBeGreaterThan(1)
})

test('Test Get Wallet Info on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__get-wallet-info') // Click on get wallet info button
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
  expect(response.isLedger).toBeDefined() // Verify if the response returned isLedger
})

test('Test Calculate Fee on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  await dappPage.awaitAndClickTestId('hello-world__calculate-fee')
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
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
  await dappPage.awaitAndClickTestId('hello-world__sign-transaction') // Click on Sign Transaction button
  await acceptPendingRequestToReactWallet(walletPage)
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined() // Verify  if the response had a return
})

test('Test Wipe Methods on dapp (React)', async ({ context }) => {
  // Define the dapp and wallet pages
  const dappPage = DAPP_REACT
  const walletPage = WALLET_REACT
  const amountOfMethodsToBeWiped = 3
  await connectReactDappToNewReactAccount(context, dappPage, walletPage)
  for (let i = 0; i < amountOfMethodsToBeWiped; i++) {
    // Click on Sign Transaction button amountOfMethodsToBeWiped times
    await dappPage.awaitAndClickTestId('hello-world__sign-transaction')
  }
  await dappPage.awaitAndClickTestId('hello-world__wipe-methods') // Click on Wipe Methods button
  const response = await getAnyFromInnerHTML(await dappPage.awaitAndGetTestId('hello-world__method-response'))
  expect(response).toBeDefined()
  expect((response as string[]).length).toBe(amountOfMethodsToBeWiped)
  const pendingRequests = await walletPage.page.getByTestId('default-card__pending-request').all()
  expect(pendingRequests.length).toBe(0) // Verify if has no pending Requests
})
