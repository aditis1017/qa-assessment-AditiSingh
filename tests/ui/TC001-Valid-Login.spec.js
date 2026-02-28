import { test, expect } from '@playwright/test';
require('dotenv').config();

const BASE_URL = process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com';
const { VALID_USERNAME, VALID_PASSWORD } = process.env;
const { LoginPage } = require('../../pageObjects/LoginPage');
const { InventoryPage } = require('../../pageObjects/InventoryPage');

test.describe('Sauce Demo UI Tests', () => {
  
  // Test Case 1: Login with valid credentials
  test('TC001 - Valid login displays inventory with products', async ({ page }) => {
   
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Fill and submit login form
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    
    
    // Verify inventory items are displayed
    const inventoryPage = new InventoryPage(page);
   
    const count = await inventoryPage.getInventoryItemsCount();
    expect(count).toBeGreaterThan(0);
  
    
    });
  });