import { test, expect } from '@playwright/test';
import { name } from '../../playwright.config';
require('dotenv').config();

const BASE_URL = process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com';
const { VALID_USERNAME, VALID_PASSWORD } = process.env;
const { LoginPage } = require('../../pageObjects/LoginPage');
const { InventoryPage } = require('../../pageObjects/InventoryPage');
const { CartPage } = require('../../pageObjects/CartPage');
const inventoryItems = require('../../tests/fixtures/inventoryItems.json');

test('TC003 - Add 3 products to cart and verify', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

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

  // Verify item names, prices, and quantities
  const itemNames = await cartPage.getItemNames();
  const itemPrices = await cartPage.getItemPrices();
  const itemQuantities = await cartPage.getItemQuantities();
  
  expect(itemNames).toContain(inventoryItems.name[0]);
  expect(itemNames).toContain(inventoryItems.name[1]);
  expect(itemNames).toContain(inventoryItems.name[2]);

  expect(itemPrices).toContain(inventoryItems.price[0]);
  expect(itemPrices).toContain(inventoryItems.price[1]);
  expect(itemPrices).toContain(inventoryItems.price[2]);

  expect(itemQuantities.length).toBe(3);
});