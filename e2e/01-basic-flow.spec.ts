import { test, expect } from '@playwright/test'

test.describe('Flujo Básico - Navegación Principal', () => {
  test('navegación entre Home → Precios → Nosotros', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/AeroTest|Futuros Pilotos|aeroTests/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    
    await page.getByRole('link', { name: /Pricing|Precios/i }).click()
    await expect(page).toHaveURL(/.*pricing/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Elige Tu Camino|Precios|Pricing|Planes/i)
    
    await page.getByRole('link', { name: /About|Nosotros|Sobre/i }).click()
    await expect(page).toHaveURL(/.*about/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/About|Nosotros|Sobre/i)
    
    await page.getByRole('navigation').getByRole('link', { name: /AeroTests/i }).click()
    await expect(page).toHaveURL('/')
  })
  
  test('elementos principales de la página de inicio', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByRole('link', { name: /Comenzar Ahora|Start Now/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Ver Demo|View Demo/i })).toBeVisible()
    
    const heroSection = page.getByRole('heading', { level: 1 }).first()
    await expect(heroSection).toBeVisible()
  })
  
  test('página de precios - elementos principales', async ({ page }) => {
    await page.goto('/pricing')
    
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    
    const planCards = page.locator('[data-testid="plan-card"], .plan-card, .pricing-card')
    if (await planCards.count() > 0) {
      await expect(planCards.first()).toBeVisible()
    }
    
    const ctaButtons = page.getByRole('button', { name: /Empezar|Comenzar|Subscribe|Suscribirse/i })
    if (await ctaButtons.count() > 0) {
      await expect(ctaButtons.first()).toBeVisible()
    }
  })
  
  test('página nosotros - información del proyecto', async ({ page }) => {
    await page.goto('/about')
    
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    
    const profileSection = page.getByText('Marc Benito')
    if (await profileSection.count() > 0) {
      await expect(profileSection).toBeVisible()
    }
    
    const externalLinks = page.getByRole('link', { name: /Website|GitHub|LinkedIn/i })
    for (const link of await externalLinks.all()) {
      await expect(link).toHaveAttribute('target', '_blank')
    }
  })
}) 