import ExampleProject from '../models/ExampleProject'
import { getCleanInnerHTML } from '../helpers/CleanerHelper'

export async function getDappUri(dappPage: ExampleProject, componentTestId: string): Promise<string> {
  await dappPage.awaitAndClickTestId(`${componentTestId}__get-uri-button`) // Click the button to get the dapp URI
  await dappPage.awaitAndClickTestId(`${componentTestId}__get-uri-button`) // Click the button to get the dapp URI
  return await getCleanInnerHTML(await dappPage.awaitAndGetTestId(`${componentTestId}__dapp-uri`)) // Get and store the clean dapp URI
}
