import type { PlaywrightTestConfig } from '@playwright/test'
import { JSON_REPORT_PATH, TESTS_DIR } from './src/constants/PathsDefinitions'
import { MAX_RETRIES, RUN_CONCURRENTLY_COMMAND } from './src/constants/DevConstants'

const config: PlaywrightTestConfig = {
  fullyParallel: false,
  testMatch: '**/*.spec.ts',
  webServer: {
    command: RUN_CONCURRENTLY_COMMAND,
    port: 3000, // It needs a port to run the command above
  },
  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'never' }],
    ['json', { outputFile: JSON_REPORT_PATH }],
  ],
  testDir: TESTS_DIR,

  retries: MAX_RETRIES,
  use: {
    offline: false,
    permissions: ['clipboard-read', 'clipboard-write', 'background-sync', 'payment-handler', 'notifications'],
    screenshot: 'on',
    video: 'on',
  },
  timeout: 100000,
}

export default config
