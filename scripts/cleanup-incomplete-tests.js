// Cargar variables de entorno (Next.js ya incluye dotenv)
require('dotenv').config({ path: '.env.production.local' })

const { createClient } = require('@supabase/supabase-js')

// Configuración de Supabase - REQUIERE SERVICE ROLE KEY para permisos de administrador
const supabaseUrl = process.env.NEXT_SUPABASE_URL
const supabaseServiceRoleKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Error: Se requieren las variables de entorno NEXT_SUPABASE_URL y NEXT_SUPABASE_SERVICE_ROLE_KEY')
  console.error('   El Service Role Key es necesario para tener permisos de administrador y poder eliminar datos.')
  console.error('   Puedes encontrar esta clave en tu dashboard de Supabase > Settings > API')
  process.exit(1)
}

// Crear cliente con Service Role Key (bypassa RLS)
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function cleanupIncompleteTests() {
  try {
    console.log('🧹 Iniciando limpieza de tests incompletos...\n')

    // Verificar configuración
    console.log('🔍 Verificando configuración...')
    console.log(`   NEXT_SUPABASE_URL: ${supabaseUrl ? '✅ Configurado' : '❌ No configurado'}`)
    console.log(`   NEXT_SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? '✅ Configurado' : '❌ No configurado'}`)
    
    if (supabaseUrl) {
      console.log(`   URL: ${supabaseUrl}`)
    }
    console.log('')

    // 1. Mostrar estadísticas antes de la limpieza
    console.log('📊 Obteniendo estadísticas...')
    const { data: beforeStats, error: beforeError } = await supabase
      .from('test_executions')
      .select('id, completed_at')

    if (beforeError) {
      console.error('❌ Error obteniendo estadísticas:', beforeError)
      throw beforeError
    }

    const totalBefore = beforeStats.length
    const incompleteCount = beforeStats.filter(test => !test.completed_at).length
    const completedCount = beforeStats.filter(test => test.completed_at).length

    console.log('📊 ESTADÍSTICAS ANTES DE LA LIMPIEZA:')
    console.log(`   Total de tests: ${totalBefore}`)
    console.log(`   Tests incompletos: ${incompleteCount}`)
    console.log(`   Tests completados: ${completedCount}\n`)

    if (incompleteCount === 0) {
      console.log('✅ No hay tests incompletos para eliminar.')
      return
    }

    // 2. Obtener detalles de los tests incompletos (más de 6 horas)
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    const { data: incompleteTests, error: incompleteError } = await supabase
      .from('test_executions')
      .select('id, user_id, category_id, created_at')
      .is('completed_at', null)
      .lt('created_at', sixHoursAgo)

    if (incompleteError) throw incompleteError

    console.log('🗑️  TESTS INCOMPLETOS A ELIMINAR (más de 6 horas):')
    incompleteTests.forEach(test => {
      const createdDate = new Date(test.created_at)
      const hoursAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60))
      console.log(`   ID: ${test.id}, Usuario: ${test.user_id}, Categoría: ${test.category_id || 'genérico'}, Creado hace: ${hoursAgo}h`)
    })
    console.log('')

    // 3. Contar respuestas asociadas
    const incompleteTestIds = incompleteTests.map(test => test.id)
    const { data: answersToDelete, error: answersError } = await supabase
      .from('test_execution_answers')
      .select('id')
      .in('test_execution_id', incompleteTestIds)

    if (answersError) throw answersError

    console.log(`📝 Respuestas a eliminar: ${answersToDelete.length}\n`)

    // 4. Proceder con la eliminación automáticamente
    console.log('🚀 Iniciando eliminación automática...')

    // 5. Eliminar respuestas de tests incompletos
    console.log('🗑️  Eliminando respuestas de tests incompletos...')
    const { error: deleteAnswersError } = await supabase
      .from('test_execution_answers')
      .delete()
      .in('test_execution_id', incompleteTestIds)

    if (deleteAnswersError) throw deleteAnswersError
    console.log(`✅ ${answersToDelete.length} respuestas eliminadas.`)

    // 6. Eliminar test_executions incompletos (más de 6 horas)
    console.log('🗑️  Eliminando test_executions incompletos...')
    const { error: deleteTestsError } = await supabase
      .from('test_executions')
      .delete()
      .is('completed_at', null)
      .lt('created_at', sixHoursAgo)

    if (deleteTestsError) throw deleteTestsError
    console.log(`✅ ${incompleteCount} test_executions eliminados.`)

    // 7. Mostrar estadísticas después de la limpieza
    const { data: afterStats, error: afterError } = await supabase
      .from('test_executions')
      .select('id, completed_at')

    if (afterError) throw afterError

    const totalAfter = afterStats.length
    const incompleteAfter = afterStats.filter(test => !test.completed_at).length
    const completedAfter = afterStats.filter(test => test.completed_at).length

    console.log('\n📊 ESTADÍSTICAS DESPUÉS DE LA LIMPIEZA:')
    console.log(`   Total de tests: ${totalAfter}`)
    console.log(`   Tests incompletos: ${incompleteAfter}`)
    console.log(`   Tests completados: ${completedAfter}`)

    console.log('\n🎉 LIMPIEZA COMPLETADA EXITOSAMENTE!')
    console.log(`   • ${incompleteCount} tests incompletos eliminados`)
    console.log(`   • ${answersToDelete.length} respuestas eliminadas`)
    console.log(`   • ${completedAfter} tests completados conservados`)

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error)
    process.exit(1)
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  cleanupIncompleteTests()
}

module.exports = { cleanupIncompleteTests } 