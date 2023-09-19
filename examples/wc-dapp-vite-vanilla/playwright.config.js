

const config = {
  testMatch: '**/*.js',
  webServer: {
    command: 'yarn run build && yarn run preview',
    port: 4173,
  },
  testDir: 'tests',
}

export default config
