#!/usr/bin/env node

// Script para crear tests de muestra utilizando Supabase
// Fecha: 2023-05-01
// Autor: Claude

const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

// Configurar cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Error: Variables de entorno NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son requeridas"
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Leer el script SQL
const sqlScript = fs.readFileSync(
  path.join(__dirname, "create_sample_tests.sql"),
  "utf8"
)

// Dividir el script en declaraciones individuales
const sqlStatements = sqlScript
  .split(";")
  .map((stmt) => stmt.trim())
  .filter((stmt) => stmt.length > 0)
  .map((stmt) => stmt + ";")

// Función principal
async function createSampleTests() {
  console.log("🚀 Iniciando creación de tests de muestra...")

  try {
    // Ejecutar script SQL como una sola transacción si es posible
    const { data, error } = await supabase.rpc("exec_sql", {
      sql_query: sqlScript,
    })

    if (error) {
      console.error("Error al ejecutar el script SQL:", error)

      // Si falla, intentar ejecutar declaraciones individuales
      console.log("Intentando ejecutar declaraciones individuales...")

      for (const [index, statement] of sqlStatements.entries()) {
        console.log(
          `Ejecutando declaración ${index + 1}/${sqlStatements.length}`
        )
        const { error } = await supabase.rpc("exec_sql", {
          sql_query: statement,
        })

        if (error) {
          console.error(`Error en la declaración ${index + 1}:`, error)
          console.error("SQL:", statement)
        }
      }
    } else {
      console.log("✅ Script SQL ejecutado con éxito")
    }

    // Verificar los tests creados
    const { data: tests, error: testsError } = await supabase
      .from("tests")
      .select(
        `
        id, 
        category_id,
        categories (name),
        created_at,
        duration_seconds,
        test_questions (count)
      `
      )
      .order("id")

    if (testsError) {
      console.error("Error al obtener los tests creados:", testsError)
    } else {
      console.log("\nTests creados:")
      tests.forEach((test) => {
        console.log(
          `ID: ${test.id} | Categoría: ${
            test.categories?.name || test.category_id
          } | Duración: ${test.duration_seconds / 60} min | Preguntas: ${
            test.test_questions?.[0]?.count || 0
          }`
        )
      })
    }
  } catch (err) {
    console.error("Error inesperado:", err)
  }
}

// Ejecutar la función principal
createSampleTests().catch(console.error)
