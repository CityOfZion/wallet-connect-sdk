import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: '**/*.ts',
  webServer: {
    command: 'yarn start',
    port: 3000,
  },
  testDir: 'tests',
}

export default config
