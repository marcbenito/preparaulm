import { test, expect } from '@playwright/test'

test.describe('Flujo Usuario Logado - Dashboard', () => {
  const testUser = {
    email: 'test@preparaulm.com',
    password: 'testpassword123.$%&'
  }

  test('acceso a página de login', async ({ page }) => {
    await page.goto('/login')

    await expect(page.locator('h1').first()).toContainText(/Bienvenido|Login|Iniciar|Sesión/i)

    const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
    const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
    const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
  })

  test('proceso de login y acceso al dashboard', async ({ page }) => {
    await page.goto('/login')

    await expect(page.locator('h1').first()).toContainText(/Bienvenido|Login|Iniciar|Sesión/i)

    const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
    const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
    const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })

    await emailInput.fill(testUser.email)
    await passwordInput.fill(testUser.password)
    await submitButton.click()

    await page.waitForTimeout(1000)





    await expect(page).toHaveURL(/.*dashboard.*/)
    await expect(page.locator('h1')).toContainText(/Dashboard/i)
    console.log('✅ Login exitoso')
    const statsCards = page.locator('[data-testid="stat-card"], .stat-card, .dashboard-card')
    if (await statsCards.count() > 0) {
      await expect(statsCards.first()).toBeVisible()
    }

    const testButton = page.getByRole('link', { name: /Realizar|Test/i })
    if (await testButton.count() > 0) {
      await expect(testButton.first()).toBeVisible()
    }

  })



}) 