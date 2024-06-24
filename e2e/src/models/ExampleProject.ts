import { BrowserContext, Page } from '@playwright/test'
import { EXAMPLES_PATH } from '../constants/PathsDefinitions'

export default class ExampleProject {
  projectPathName: string
  projectPort: number
  page: Page | null = null

  constructor(projPathName: string, projPort: number) {
    if (!projPathName.trim() || projPort % 1 > 0 || projPort <= 0) throw Error('Invalid values')
    this.projectPathName = projPathName
    this.projectPort = projPort
  }

  get runCommand(): string {
    if (this.projectPathName.includes('react'))
      return `"cd ${EXAMPLES_PATH}/${this.projectPathName} && cross-env PORT=${this.projectPort} npx serve -s build"`
    else if (this.projectPathName.includes('vite') || this.projectPathName.includes('sveltekit'))
      return `"cd ${EXAMPLES_PATH}/${this.projectPathName} && pnpm vite preview --port ${this.projectPort}"`
    else throw Error('Unknown project framework')
  }

  async openPage(context: BrowserContext, path?: string) {
    this.page = await context.newPage()
    await this.goTo(path ? path : '')
    await this.awaitPageLoad()
  }

  async goTo(path: string) {
    if (!this.page) throw Error('Page not started')
    await this.page.goto(`http://localhost:${this.projectPort}/${path}`)
  }

  async awaitPageLoad(awaitInitialRequests?: boolean) {
    if (!this.page) throw Error('Page not started')
    await Promise.all([
      this.page.waitForLoadState('load'),
      this.page.waitForLoadState('domcontentloaded'),
      !awaitInitialRequests ? () => {} : this.page.waitForLoadState('networkidle'),
    ])
  }

  async awaitSeconds(seconds: number) {
    if (!this.page) throw Error('Page not started')
    if (seconds < 0) throw Error('Cannot await negative seconds')
    await this.page.waitForTimeout(seconds * 1000)
  }

  // Don't use this command with tags that are expected not to exist.
  async awaitTestId(testId: string) {
    await this.page.waitForSelector(`[data-testid="${testId}"]`)
  }

  async awaitAndGetTestId(testId: string) {
    await this.awaitTestId(testId)
    return this.page.getByTestId(testId)
  }

  async awaitAndGetAllTestId(testId: string) {
    await this.awaitTestId(testId)
    return this.page.getByTestId(testId).all()
  }

  async awaitAndClickTestId(testId: string) {
    await this.awaitTestId(testId)
    await (await this.awaitAndGetTestId(testId)).click()
  }
}
