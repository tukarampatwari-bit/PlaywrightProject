import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Add 1 retry locally
  workers: process.env.CI ? 1 : undefined,
  
  // Enhanced reporter configuration
  reporter: [
    ['html', { 
      open: 'on-failure',  // Changed to open on failure
      outputFolder: 'playwright-report' 
    }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }] // Add JSON for debugging
  ],
  
  use: {
    screenshot: 'on',  // Changed to always capture
    video: 'on',       // Changed to always capture
    trace: 'on',       // Changed to always capture
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