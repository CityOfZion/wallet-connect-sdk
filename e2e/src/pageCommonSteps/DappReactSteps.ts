import ExampleProject from '../models/ExampleProject'
import { getCleanInnerHTML } from '../helpers/CleanerHelper'

export async function getReactDappUri(dappPage: ExampleProject): Promise<string> {
  await dappPage.awaitAndClickTestId('hello-world__get-uri-button') // Click the button to get the dapp URI
  await dappPage.awaitAndClickTestId('hello-world__get-uri-button') // Click the button to get the dapp URI
  return await getCleanInnerHTML(await dappPage.awaitAndGetTestId('hello-world__dapp-uri')) // Get and store the clean dapp URI
}
