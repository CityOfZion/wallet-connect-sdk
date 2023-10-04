import { Locator } from '@playwright/test'
import { HTML_ENTITIES, MAX_RETRIES } from '../constants/DevConstants'

export async function getCleanInnerHTML(locator: Locator): Promise<string> {
  let dirtyString = await locator.innerHTML()
  let retries = 0
  do {
    dirtyString = await locator.innerHTML()
    if (dirtyString.trim()) await locator.page().waitForTimeout(2000)
    retries++
  } while (retries < MAX_RETRIES && !dirtyString.trim())
  return dirtyString.replace(RegExp(Object.keys(HTML_ENTITIES).join('|'), 'g'), (match) => HTML_ENTITIES[match])
}

export async function getAnyFromInnerHTML(locator: Locator): Promise<any> {
  return JSON.parse(await getCleanInnerHTML(locator))
}
