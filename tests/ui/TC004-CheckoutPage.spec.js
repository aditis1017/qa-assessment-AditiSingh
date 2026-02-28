import { test, expect } from '@playwright/test';
import { name } from '../../playwright.config';
require('dotenv').config();

const BASE_URL = process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com';
const { VALID_USERNAME, VALID_PASSWORD } = process.env;
const { LoginPage } = require('../../pageObjects/LoginPage');
const { InventoryPage } = require('../../pageObjects/InventoryPage');
const { CartPage } = require('../../pageObjects/CartPage');
const inventoryItems = require('../../tests/fixtures/inventoryItems.json');
const {CheckoutPage} = require('../../pageObjects/CheckoutPage');
const checkoutData = require('../../tests/fixtures/chechoutPage.json');

test('TC004 -Verify Checkout Page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

  // Add first 3 products to cart
  await inventoryPage.addItemToCart(0);
  await inventoryPage.addItemToCart(1);
  await inventoryPage.addItemToCart(2);

  // Verify cart badge
  const cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('3');

  // Go to cart
  await inventoryPage.goToCart();

  // Verify 3 items in cart
  const cartItemCount = await cartPage.getItemCount();
  expect(cartItemCount).toBe(3);

  // Verify item names and prices exist
  const itemNames = await cartPage.getItemNames();
  const itemPrices = await cartPage.getItemPrices();
  const itemQuantities = await cartPage.getItemQuantities();
  
  expect(itemNames.length).toBe(3); 
  expect(itemPrices.length).toBe(3);
  expect(itemQuantities.length).toBe(3);

  await cartPage.checkoutBtn.click();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  await checkoutPage.fillDetails(checkoutData.fname, checkoutData.lname, checkoutData.postalCode);

  // Click continue button
  await checkoutPage.continue();
  await expect(page).toHaveURL(/.*checkout-step-two\.html/);

  // Click finish button
  await checkoutPage.finish();
  await expect(page).toHaveURL(/.*checkout-complete\.html/);

  // Verify confirmation message
  await expect(checkoutPage.confirmation).toBeVisible();

});