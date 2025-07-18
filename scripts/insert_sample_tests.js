const { createClient } = require("@supabase/supabase-js")

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function insertSampleTests() {
  try {
    // Obtener categorías principales
    const { data: categories, error: categoryError } = await supabase
      .from("categories")
      .select("*")
      .is("parent_category_id", null)

    if (categoryError) throw categoryError

    for (const category of categories) {
      // Insertar un test por cada categoría principal
      const { data: test, error: testError } = await supabase
        .from("tests")
        .insert({ category_id: category.id, duration_seconds: 3600 })
        .select()

      if (testError) throw testError

      // Obtener preguntas de la categoría
      const { data: questions, error: questionError } = await supabase
        .from("questions")
        .select("*")
        .eq("category_id", category.id)

      if (questionError) throw questionError

      // Asociar preguntas al test
      for (const [index, question] of questions.entries()) {
        const { error: testQuestionError } = await supabase
          .from("test_questions")
          .insert({
            test_id: test[0].id,
            question_id: question.id,
            order_num: index + 1,
          })

        if (testQuestionError) throw testQuestionError
      }
    }

    console.log("Tests de muestra insertados correctamente.")
  } catch (error) {
    console.error("Error al insertar tests de muestra:", error)
  }
}

insertSampleTests()
