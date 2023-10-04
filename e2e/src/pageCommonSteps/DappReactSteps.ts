import ExampleProject from '../models/ExampleProject'
import { getCleanInnerHTML } from '../helpers/CleanerHelper'

export async function getReactDappUri(dappPage: ExampleProject): Promise<string> {
  await dappPage.page.getByTestId('hello-world__get-uri-button').click() // Click the button to get the dapp URI
  await dappPage.awaitSeconds(2) // Wait for 2 seconds
  await dappPage.page.getByTestId('hello-world__get-uri-button').click() // Click the button to get the dapp URI
  return await getCleanInnerHTML(dappPage.page.getByTestId('hello-world__dapp-uri')) // Get and store the clean dapp URI
}
