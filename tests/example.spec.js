import { test, expect } from '@playwright/test';

test('Create New Patient – Happy Path', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://qa.nulogic-ehr.com/login');

  // Login
  await page.getByRole('textbox', { name: 'Enter Username' }).fill('tukaram.patwari+01@thinkitive.com');
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('Tuka@123');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Verify successful login
  await expect(page.getByRole('button', { name: 'Add New Patient' })).toBeVisible();

  // Start patient creation
  await page.getByRole('button', { name: 'Add New Patient' }).click();

  // Verify Add New Patient page is visible
  await expect(page.getByRole('textbox', { name: 'Enter First Name' })).toBeVisible();

  // Fill patient basic information
  await page.getByRole('textbox', { name: 'Enter First Name' }).fill('Pawan');
  await page.getByRole('textbox', { name: 'Enter Last Name' }).fill('Kumar');

  // Select Gender at Birth
  await page.getByRole('button', { name: 'Select Gender at Birth' }).click();
  await page.locator('#patient-onboarding-gender-at-birth-dropdown-option-0').getByText('Male', { exact: true }).click();

  // Select Current Gender
  await page.getByRole('button', { name: 'Select Current Gender' }).click();
  await page.locator('#patient-onboarding-current-gender-dropdown-option-Male').getByText('Male', { exact: true }).click();

  // Select Date of Birth
  await page.getByRole('button', { name: 'open calendar' }).first().click();
  await page.getByText('February').click();
  await page.getByRole('radio', { name: '2016' }).click();

  // Select Preferred Language
  await page.getByRole('button', { name: 'Select Preferred Language' }).click();
  await page.getByRole('menuitem', { name: 'English (en)' }).click();

  // Enter SSN
  await page.getByRole('textbox', { name: 'Enter SSN Number' }).fill('321-42-1342');

  // Select Treatment Type
  await page.getByRole('button', { name: 'Select Treatment Type' }).click();
  await page.getByRole('menuitem', { name: 'MAT', exact: true }).click();

  // Enter Email
  await page.getByRole('textbox', { name: 'Enter Email ID' }).fill('tukaram.patwari+29@thinkitive.com');

  // Select Practice Location
  await page.getByRole('button', { name: 'Select Practice Location' }).click();
  await page.locator('#patient-onboarding-practice-location-dropdown-option-15').getByText('Dharashiv').click();

  // Select Source
  await page.getByRole('button', { name: 'Select Source' }).click();
  await page.getByRole('menuitem', { name: 'Individual' }).click();

  // Save patient
  await page.getByRole('button', { name: 'Save & Next' }).click();

  // Navigate to Patients page
 // await page.getByRole('button', { name: 'Patients' }).click();
});