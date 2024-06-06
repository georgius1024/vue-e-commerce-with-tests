import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/#/');
  await page.getByRole('link', { name: 'Beauty' }).click();
  await page.getByTestId('product-preview-1').getByRole('img', { name: 'preview' }).click();
  await expect(page.getByTestId('checkout').first()).toHaveText('Your cart is empty');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByTestId('checkout').first()).toHaveText('1 product in your cart');
  await page.getByRole('button', { name: 'Remove from cart' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByTestId('checkout').first()).toHaveText('1 product in your cart');
  await page.getByRole('link', { name: 'product in your cart' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Checkout' }).click();
});