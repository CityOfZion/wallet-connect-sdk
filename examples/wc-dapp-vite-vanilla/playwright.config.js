const config = {
  fullyParallel: true,
  testMatch: '**/*.js',
  webServer: {
    command: 'yarn preview',
    port: 4173,
  },
  testDir: 'tests',
}

export default config
