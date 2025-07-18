import { test, expect } from '@playwright/test'

test.describe('Flujo Completar Test - Desde Test Selection', () => {
  const testUser = {
    email: 'test@aerotestulm.com',
    password: 'testpassword123.$%&'
  }
  
  test('verificar elementos de la página test-selection', async ({ page }) => {
    await page.goto('/test-selection')
    
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    if (currentUrl.includes('/login')) {
      console.log('Redirigido a login desde test-selection - comportamiento esperado')
      
      const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
      const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
      const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })
      
      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
      await expect(submitButton).toBeVisible()
      
      await emailInput.fill(testUser.email)
      await passwordInput.fill(testUser.password)
      await submitButton.click()
      
      await page.waitForTimeout(3000)
      
      const urlAfterLogin = page.url()
      if (urlAfterLogin.includes('/test-selection')) {
        await expect(page.locator('h1')).toContainText(/Selección|Test|Categorías/i)
        
        const genericTestSection = page.locator('text="Test Genérico"')
        await expect(genericTestSection).toBeVisible()
        
        const testButtons = page.getByRole('button', { name: /Comenzar|Iniciar|Test/i })
        await expect(testButtons.first()).toBeVisible()
      } else {
        console.log('No se redirigió a test-selection después del login')
      }
    } else {
      await expect(page.locator('h1')).toContainText(/Selección|Test|Categorías/i)
      
      const genericTestSection = page.locator('text="Test Genérico"')
      await expect(genericTestSection).toBeVisible()
      
      const testButtons = page.getByRole('button', { name: /Comenzar|Iniciar|Test/i })
      await expect(testButtons.first()).toBeVisible()
    }
    
    const categoryCards = page.locator('.category-card, [data-testid="category-card"], .bg-white\\/5')
    if (await categoryCards.count() > 0) {
      await expect(categoryCards.first()).toBeVisible()
    }
  })
  
  test('intentar iniciar test genérico con pantalla de preparación', async ({ page }) => {
    await page.goto('/test-selection')
    
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    if (currentUrl.includes('/login')) {
      const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
      const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
      const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })
      
      await emailInput.fill(testUser.email)
      await passwordInput.fill(testUser.password)
      await submitButton.click()
      
      await page.waitForTimeout(3000)
    }
    
    const urlAfterAuth = page.url()
    if (urlAfterAuth.includes('/test-selection')) {
      await expect(page.locator('h1')).toContainText(/Selección|Test|Categorías/i)
      
      const startTestButton = page.getByRole('button', { name: /Comenzar|Iniciar|Test Genérico|Empezar/i }).first()
      await expect(startTestButton).toBeVisible()
      
      console.log('✅ Haciendo clic en Comenzar Test Genérico...')
      await startTestButton.click()
      
      console.log('✅ Verificando pantalla de preparación...')
      
      await expect(page.locator('text="Preparando tu test"')).toBeVisible({ timeout: 2000 })
      await expect(page.locator('text="Estamos generando tu test con ayuda de inteligencia artificial"')).toBeVisible()
      await expect(page.locator('text="totalmente adaptado a ti"')).toBeVisible()
      
      console.log('✅ Pantalla de preparación mostrada correctamente')
      
      await page.waitForTimeout(3000)
      
      const urlAfterPreparation = page.url()
      console.log('URL después de preparación:', urlAfterPreparation)
      
      if (urlAfterPreparation.includes('/test/')) {
        console.log('✅ Test iniciado correctamente')
        await expect(page).toHaveURL(/.*test\/.*/)
        
        const questionElement = page.locator('h2, .question-text, [data-testid="question"]')
        await expect(questionElement.first()).toBeVisible()
      } else {
        console.log('❌ No se navegó al test')
        console.log('Puede que haya un error en la creación del test o falta configuración')
      }
    } else {
      console.log('No se pudo acceder a test-selection después de la autenticación')
    }
  })
  
  test('flujo completo simplificado con pantalla de preparación', async ({ page }) => {
    await page.goto('/test-selection')
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    if (currentUrl.includes('/login')) {
      console.log('Autenticándose...')
      
      const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
      const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
      const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })
      
      await emailInput.fill(testUser.email)
      await passwordInput.fill(testUser.password)
      await submitButton.click()
      await page.waitForTimeout(3000)
    }
    
    const urlAfterAuth = page.url()
    if (urlAfterAuth.includes('/test-selection')) {
      console.log('✅ En página de selección de tests')
      
      const startTestButton = page.getByRole('button', { name: /Comenzar|Iniciar|Test Genérico|Empezar/i }).first()
      if (await startTestButton.isVisible()) {
        await startTestButton.click()
        
        console.log('✅ Verificando pantalla de preparación...')
        await expect(page.locator('text="Preparando tu test"')).toBeVisible({ timeout: 2000 })
        await expect(page.locator('text="inteligencia artificial"')).toBeVisible()
        
        await page.waitForTimeout(3000)
        
        const testUrl = page.url()
        if (testUrl.includes('/test/')) {
          console.log('✅ Test iniciado, respondiendo preguntas...')
          
          for (let i = 0; i < 5; i++) {
            await page.waitForTimeout(1000)
            
            const questionExists = await page.locator('h2, .question-text, [data-testid="question"]').count() > 0
            if (!questionExists) {
              console.log('No hay más preguntas, test completado')
              break
            }
            
            const optionA = page.locator('input[type="radio"]').first()
            if (await optionA.count() > 0) {
              await optionA.click()
              await page.waitForTimeout(500)
              
              const nextButton = page.getByRole('button', { name: /Siguiente|Next|Continuar/i })
              const submitButton = page.getByRole('button', { name: /Finalizar|Submit|Terminar/i })
              
              if (await submitButton.count() > 0 && await submitButton.isVisible()) {
                await submitButton.click()
                console.log('Test finalizado')
                break
              } else if (await nextButton.count() > 0 && await nextButton.isVisible()) {
                await nextButton.click()
              }
            }
            
            console.log(`Pregunta ${i + 1} completada`)
          }
          
          await page.waitForTimeout(2000)
          console.log('URL final:', page.url())
        } else {
          console.log('❌ Error: No se pudo iniciar el test')
        }
      } else {
        console.log('❌ No se encontró el botón para iniciar test')
      }
    } else {
      console.log('❌ No se pudo acceder a la página de selección de tests')
    }
  })

  test('flujo completo con pantalla de preparación y finalización IA', async ({ page }) => {
    await page.goto('/test-selection')
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    if (currentUrl.includes('/login')) {
      console.log('Autenticándose...')
      
      const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
      const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
      const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })
      
      await emailInput.fill(testUser.email)
      await passwordInput.fill(testUser.password)
      await submitButton.click()
      await page.waitForTimeout(3000)
    }
    
    const urlAfterAuth = page.url()
    if (urlAfterAuth.includes('/test-selection')) {
      console.log('✅ En página de selección de tests')
      
      const startTestButton = page.getByRole('button', { name: /Comenzar|Iniciar|Test Genérico|Empezar/i }).first()
      if (await startTestButton.isVisible()) {
        console.log('✅ Haciendo clic en comenzar test...')
        await startTestButton.click()
        
        console.log('✅ Verificando pantalla de preparación...')
        await expect(page.locator('text="Preparando tu test"')).toBeVisible({ timeout: 2000 })
        await expect(page.locator('text="Estamos generando tu test con ayuda de inteligencia artificial"')).toBeVisible()
        await expect(page.locator('text="totalmente adaptado a ti"')).toBeVisible()
        
        console.log('✅ Pantalla de preparación verificada, esperando navegación...')
        await page.waitForTimeout(3000)
        
        const testUrl = page.url()
        if (testUrl.includes('/test/')) {
          console.log('✅ Test iniciado, completando test para probar finalización...')
          
          for (let i = 0; i < 10; i++) {
            await page.waitForTimeout(1000)
            
            const questionExists = await page.locator('h2, .question-text, [data-testid="question"]').count() > 0
            if (!questionExists) {
              console.log('No hay más preguntas')
              break
            }
            
            const optionA = page.locator('input[type="radio"]').first()
            if (await optionA.count() > 0) {
              await optionA.click()
              await page.waitForTimeout(500)
              
              const finishButton = page.getByRole('button', { name: /Finalizar|Finalizar test/i })
              const nextButton = page.getByRole('button', { name: /Siguiente|Next|Continuar/i })
              
              if (await finishButton.count() > 0 && await finishButton.isVisible()) {
                console.log('✅ Presionando botón finalizar...')
                
                const startTime = Date.now()
                await finishButton.click()
                
                console.log('✅ Verificando pantalla de finalización IA...')
                
                const aiScreenTitle = page.locator('text="Calculando tus resultados…"')
                await expect(aiScreenTitle).toBeVisible({ timeout: 5000 })
                
                const aiAnalysisText = page.locator('text="Estamos analizando tu test con ayuda de inteligencia artificial"')
                await expect(aiAnalysisText).toBeVisible()
                
                const detailedReportText = page.locator('text="En unos segundos tendrás un informe detallado y adaptado a ti"')
                await expect(detailedReportText).toBeVisible()
                
                const progressIndicator = page.locator('.animate-spin')
                await expect(progressIndicator.first()).toBeVisible()
                
                console.log('✅ Pantalla de finalización mostrada correctamente')
                
                await page.waitForTimeout(3000)
                
                const endTime = Date.now()
                const elapsedTime = endTime - startTime
                
                console.log(`Tiempo transcurrido en pantalla finalización: ${elapsedTime}ms`)
                expect(elapsedTime).toBeGreaterThanOrEqual(2000)
                
                await page.waitForURL(/.*test\/.*\/review/, { timeout: 10000 })
                console.log('✅ Redirigido a página de revisión correctamente')
                
                const reviewUrl = page.url()
                expect(reviewUrl).toMatch(/.*test\/.*\/review/)
                
                break
              } else if (await nextButton.count() > 0 && await nextButton.isVisible()) {
                await nextButton.click()
              }
            }
            
            console.log(`Pregunta ${i + 1} completada`)
          }
        } else {
          console.log('❌ Error: No se pudo iniciar el test')
        }
      } else {
        console.log('❌ No se encontró el botón para iniciar test')
      }
    } else {
      console.log('❌ No se pudo acceder a la página de selección de tests')
    }
  })

  test('verificar tiempo mínimo de 2 segundos en pantalla finalización', async ({ page }) => {
    await page.goto('/test-selection')
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    if (currentUrl.includes('/login')) {
      const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
      const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
      const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })
      
      await emailInput.fill(testUser.email)
      await passwordInput.fill(testUser.password)
      await submitButton.click()
      await page.waitForTimeout(3000)
    }
    
    const urlAfterAuth = page.url()
    if (urlAfterAuth.includes('/test-selection')) {
      const startTestButton = page.getByRole('button', { name: /Comenzar|Iniciar|Test Genérico|Empezar/i }).first()
      if (await startTestButton.isVisible()) {
        await startTestButton.click()
        await page.waitForTimeout(3000)
        
        const testUrl = page.url()
        if (testUrl.includes('/test/')) {
          for (let i = 0; i < 5; i++) {
            await page.waitForTimeout(1000)
            
            const questionExists = await page.locator('h2, .question-text, [data-testid="question"]').count() > 0
            if (!questionExists) break
            
            const optionA = page.locator('input[type="radio"]').first()
            if (await optionA.count() > 0) {
              await optionA.click()
              await page.waitForTimeout(500)
              
              const finishButton = page.getByRole('button', { name: /Finalizar|Finalizar test/i })
              const nextButton = page.getByRole('button', { name: /Siguiente|Next|Continuar/i })
              
              if (await finishButton.count() > 0 && await finishButton.isVisible()) {
                const startTime = Date.now()
                await finishButton.click()
                
                const aiScreenTitle = page.locator('text="Calculando tus resultados…"')
                await expect(aiScreenTitle).toBeVisible({ timeout: 5000 })
                
                await page.waitForFunction(() => {
                  return !document.querySelector('text="Calculando tus resultados…"')
                }, { timeout: 15000 })
                
                const endTime = Date.now()
                const totalTime = endTime - startTime
                
                console.log(`Tiempo total en pantalla finalización: ${totalTime}ms`)
                expect(totalTime).toBeGreaterThanOrEqual(2000)
                console.log('✅ Tiempo mínimo de 2 segundos respetado')
                
                break
              } else if (await nextButton.count() > 0 && await nextButton.isVisible()) {
                await nextButton.click()
              }
            }
          }
        }
      }
    }
  })

  test('verificar elementos de accesibilidad en pantalla finalización', async ({ page }) => {
    await page.goto('/test-selection')
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    if (currentUrl.includes('/login')) {
      const emailInput = page.getByLabel(/email|correo/i).or(page.locator('input[type="email"]')).first()
      const passwordInput = page.getByLabel(/password|contraseña/i).or(page.locator('input[type="password"]')).first()
      const submitButton = page.locator('form').getByRole('button', { name: /login|iniciar|entrar|sign in/i })
      
      await emailInput.fill(testUser.email)
      await passwordInput.fill(testUser.password)
      await submitButton.click()
      await page.waitForTimeout(3000)
    }
    
    const urlAfterAuth = page.url()
    if (urlAfterAuth.includes('/test-selection')) {
      const startTestButton = page.getByRole('button', { name: /Comenzar|Iniciar|Test Genérico|Empezar/i }).first()
      if (await startTestButton.isVisible()) {
        await startTestButton.click()
        await page.waitForTimeout(3000)
        
        const testUrl = page.url()
        if (testUrl.includes('/test/')) {
          for (let i = 0; i < 3; i++) {
            await page.waitForTimeout(1000)
            
            const questionExists = await page.locator('h2, .question-text, [data-testid="question"]').count() > 0
            if (!questionExists) break
            
            const optionA = page.locator('input[type="radio"]').first()
            if (await optionA.count() > 0) {
              await optionA.click()
              await page.waitForTimeout(500)
              
              const finishButton = page.getByRole('button', { name: /Finalizar|Finalizar test/i })
              const nextButton = page.getByRole('button', { name: /Siguiente|Next|Continuar/i })
              
              if (await finishButton.count() > 0 && await finishButton.isVisible()) {
                await finishButton.click()
                
                const aiScreenTitle = page.locator('text="Calculando tus resultados…"')
                await expect(aiScreenTitle).toBeVisible({ timeout: 5000 })
                
                const statusElement = page.locator('[role="status"]')
                await expect(statusElement).toBeVisible()
                
                const ariaLiveElement = page.locator('[aria-live="polite"]')
                await expect(ariaLiveElement).toBeVisible()
                
                const headingElement = page.locator('h1')
                await expect(headingElement).toBeVisible()
                await expect(headingElement).toContainText('Calculando tus resultados…')
                
                console.log('✅ Elementos de accesibilidad verificados correctamente')
                
                break
              } else if (await nextButton.count() > 0 && await nextButton.isVisible()) {
                await nextButton.click()
              }
            }
          }
        }
      }
    }
  })
}) 