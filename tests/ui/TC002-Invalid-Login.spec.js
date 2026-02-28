import { test, expect } from '@playwright/test';
require('dotenv').config();

const BASE_URL = process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com';
const { VALID_USERNAME, VALID_PASSWORD, LOCKED_OUT_USERNAME } = process.env;
const { LoginPage } = require('../../pageObjects/LoginPage');
const { InventoryPage } = require('../../pageObjects/InventoryPage');
const errorMessages = require('../../tests/fixtures/errorMessages.json');

test.describe('Sauce Demo UI Tests', () => {
  
  // Test Case 2: Login with locked out user
  test('TC002 - Locked out user displays error message', async ({ page }) => {
   
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Fill and submit login form
    await loginPage.login(LOCKED_OUT_USERNAME, VALID_PASSWORD);
    
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(errorMessages.lockedOutError);
    const isVisible = await loginPage.isErrorMessageVisible();
    expect(isVisible).toBeTruthy();

  });
});