import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Add 1 retry locally
  workers: process.env.CI ? 1 : undefined,
  
  // Enhanced reporter configuration
  // reporter: [
  //   ['html', { 
  //     outputFolder: 'playwright-report', 
  //     open: 'never' 
  //   }],
  //   ['list'],
  //   ['json', { outputFile: 'test-results/results.json' }] // Add JSON for debugging
  // ],
  

  globalTeardown: './Utitls/globalTeardown.js',
  reporter: [['list']]

  // reporter: [
  //  ['html'],
  // ['junit', { outputFile: 'results.xml' }],
  // ],
,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',       // Changed to always capture
    actionTimeout: 15000, // Add action timeout
    navigationTimeout: 30000, // Add navigation timeout
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});