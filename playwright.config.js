import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  // ✅ Enable HTML + List Reporter
  reporter: [
    ['list'],
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'on-failure'   // change to 'always' if needed
    }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],


  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
