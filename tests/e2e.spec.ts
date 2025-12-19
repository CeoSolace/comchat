import { test, expect } from '@playwright/test'

test.describe('Smoke test', () => {
  test('Home page loads and redirects to login if not authenticated', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('text=Login with Discord')).toBeVisible()
  })
})

TODO: Expand tests for chat functionality