import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  testMatch: '**/*.ts',
  webServer: {
    command: 'npx serve -s build',
    port: 3000,
  },
  testDir: 'tests',
  timeout: 4000
}

export default config
