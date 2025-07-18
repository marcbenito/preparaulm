import postgres from "postgres"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config({ path: ".env.local" })

// Verificar variables de entorno
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error(
    "Error: Variable de entorno DATABASE_URL faltante. Verifica tu archivo .env.local"
  )
  process.exit(1)
}

// Rutas a los archivos SQL
const schemaPath = path.join(process.cwd(), "db", "schema.sql")
const categoriesSeedPath = path.join(
  process.cwd(),
  "db",
  "seeds",
  "categories_seed.sql"
)
const questionsDir = path.join(process.cwd(), "db", "seeds", "questions")
const sampleTestsPath = path.join(
  process.cwd(),
  "scripts",
  "create_sample_tests.sql"
)

// Función principal que carga el esquema y los seeds
async function loadDatabase() {
  // Crear cliente de PostgreSQL - Usamos el operador ! para asegurar que connectionString no es undefined
  const sql = postgres(connectionString)

  try {
    console.log("🔄 Iniciando carga de la base de datos...")

    // 1. Cargar esquema
    console.log("\n📊 CARGANDO ESQUEMA...")
    //await executeSqlFile(sql, schemaPath)

    // 2. Cargar categorías
    console.log("\n📁 CARGANDO CATEGORÍAS...")
    await executeSqlFile(sql, categoriesSeedPath)

    // 3. Cargar preguntas
    console.log("\n❓ CARGANDO PREGUNTAS...")
    const questionFiles = fs
      .readdirSync(questionsDir)
      .filter((file) => file.endsWith(".sql"))

    for (const file of questionFiles) {
      await executeSqlFile(sql, path.join(questionsDir, file))
    }

    // 4. Crear tests de muestra
    console.log("\n🧪 CREANDO TESTS DE MUESTRA...")
    await executeSqlFile(sql, sampleTestsPath)

    // 5. Mostrar resumen de tests creados
    console.log("\n📋 RESUMEN DE TESTS CREADOS:")
    const tests = await sql`
      SELECT 
        t.id, 
        c.name as categoria, 
        t.duration_seconds/60 as duracion_minutos,
        (SELECT COUNT(*) FROM test_questions WHERE test_id = t.id) as num_preguntas
      FROM tests t
      JOIN categories c ON t.category_id = c.id
      ORDER BY t.id
    `

    for (const test of tests) {
      console.log(
        `📝 Test ID: ${test.id} | Categoría: ${test.categoria} | Duración: ${test.duracion_minutos} min | Preguntas: ${test.num_preguntas}`
      )
    }

    console.log("\n✅ BASE DE DATOS CARGADA EXITOSAMENTE")
  } catch (error) {
    console.error("\n❌ ERROR CARGANDO LA BASE DE DATOS:", error)
    process.exit(1)
  } finally {
    // Cerrar conexión
    await sql.end()
    console.log("✅ Conexión cerrada")
  }
}

// Función para leer un archivo SQL y ejecutarlo
async function executeSqlFile(sql, filePath) {
  try {
    console.log(`Leyendo archivo: ${filePath}`)
    const sqlContent = fs.readFileSync(filePath, "utf8")

    console.log(`Ejecutando SQL de: ${path.basename(filePath)}`)
    await sql.unsafe(sqlContent)

    console.log(`✅ SQL ejecutado correctamente: ${path.basename(filePath)}`)
  } catch (error) {
    console.error(`❌ Error ejecutando SQL desde ${filePath}:`, error)
    throw error
  }
}

// Ejecutar la función principal
loadDatabase().catch((err) => {
  console.error("Error no controlado:", err)
  process.exit(1)
})
