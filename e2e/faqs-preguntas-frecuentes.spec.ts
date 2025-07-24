import { test, expect } from '@playwright/test'

test.describe('FAQs - Preguntas Frecuentes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faqs-preguntas-frecuentes')
  })

  test('should display FAQ categories', async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Funcionamiento" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Pagos" })).toBeVisible()
    // Usar un selector más específico para evitar strict mode violation
    await expect(page.locator('h2').filter({ hasText: 'Cuenta' })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Instructores" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Soporte" })).toBeVisible()
  })

  test('should expand FAQ items when clicked', async ({ page }) => {
    const firstQuestion = page.getByRole("button", { name: "¿Qué es PreparaULM?" })
    await expect(firstQuestion).toBeVisible()
    await firstQuestion.click()

    // Verificar que se expandió el contenido
    await expect(page.getByText(/PreparaULM es una plataforma/)).toBeVisible()
  })

  test('should have working search functionality', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Buscar en preguntas frecuentes/i)
    await expect(searchInput).toBeVisible()

    await searchInput.fill('pago')

    // Verificar que se filtran las preguntas relacionadas con pagos
    await expect(page.getByText(/pago/i)).toBeVisible()
  })

  test('should display correct FAQ sections', async ({ page }) => {
    // Verificar que todas las secciones principales están presentes
    const sections = [
      'Funcionamiento',
      'Pagos',
      'Instructores',
      'Soporte'
    ]

    for (const section of sections) {
      await expect(page.getByRole('heading', { name: section })).toBeVisible()
    }
  })

  test('should have questions under each category', async ({ page }) => {
    // Verificar algunas preguntas específicas
    await expect(page.getByRole("button", { name: "¿Qué es PreparaULM?" })).toBeVisible()
    await expect(page.getByRole("button", { name: "¿Qué métodos de pago aceptáis?" })).toBeVisible()
    await expect(page.getByRole("button", { name: "¿Cómo creo una cuenta?" })).toBeVisible()
    await expect(page.getByRole("button", { name: "¿Cómo puedo contactar con soporte?" })).toBeVisible()
  })

  test('should be accessible via footer link', async ({ page }) => {
    await page.goto('/')

    // Usar un selector más específico para evitar strict mode violation
    const faqLink = page.locator('footer').getByRole("link", { name: "Preguntas Frecuentes" })
    await expect(faqLink).toBeVisible()

    await faqLink.click()
    await expect(page).toHaveURL("/faqs-preguntas-frecuentes")

    await expect(page.getByRole("heading", { name: "Preguntas Frecuentes" })).toBeVisible()
  })

  test('should have proper page structure', async ({ page }) => {
    // Verificar estructura básica de la página
    await expect(page.getByRole("heading", { name: "Preguntas Frecuentes" })).toBeVisible()
    await expect(page.getByText(/Encuentra respuestas a las preguntas más comunes/)).toBeVisible()

    // Verificar que hay un buscador
    await expect(page.getByPlaceholder(/Buscar en preguntas frecuentes/i)).toBeVisible()
  })
}) 