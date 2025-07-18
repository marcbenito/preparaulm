# Generación de Tests - Algoritmo

## Descripción General

El algoritmo de generación de tests es responsable de crear tests personalizados para cada usuario basándose en su rendimiento histórico, las categorías seleccionadas y la dificultad adaptativa. El objetivo es proporcionar una experiencia de aprendizaje optimizada que se ajuste al nivel de conocimiento del usuario.

## Parámetros de Entrada

- `userId`: Identificador único del usuario
- `baseCategoryId` (opcional): Categoría específica para generar el test. Si no se proporciona, se genera un test genérico

## Constantes del Sistema

- `TOTAL_QUESTIONS_PER_TEST = 10`: Número total de preguntas por test

## Flujo Principal del Algoritmo

### 1. Inicialización y Recuperación de Historial

- Se obtiene el historial de preguntas ya respondidas por el usuario
- Se consulta la tabla `test_execution_answers` para evitar repetir preguntas
- Se crea un conjunto (`Set`) con los IDs de preguntas ya respondidas

### 2. Determinación de Categorías Relevantes

#### Si se especifica una categoría base:
- Se añade la categoría base a la lista de categorías relevantes
- Se obtienen las subcategorías priorizadas mediante `getPrioritizedSubcategories()`
- Se añaden las subcategorías a la lista de categorías relevantes

#### Si no se especifica categoría (test genérico):
- Se incluyen todas las categorías disponibles

### 3. Cálculo de Tasa de Éxito (Success Rate)

#### Para categoría específica:
- Se consulta `user_category_performance` para la categoría seleccionada
- Se utiliza el `success_rate` de esa categoría

#### Para test genérico:
- Se obtienen todas las performances del usuario
- Se calcula el promedio de todas las tasas de éxito

### 4. Determinación de Distribución de Dificultad

Basándose en la tasa de éxito, se determina la distribución de dificultades:

- **SR = 0%**: 70% D1, 30% D2, 0% D3, 0% D4
- **SR < 50%**: 60% D1, 30% D2, 10% D3, 0% D4
- **SR < 70%**: 30% D1, 40% D2, 30% D3, 0% D4
- **SR < 90%**: 20% D1, 30% D2, 40% D3, 10% D4
- **SR ≥ 90%**: 10% D1, 20% D2, 30% D3, 40% D4

### 5. Priorización de Subcategorías (si aplica)

Cuando se especifica una categoría base, se priorizan las subcategorías:

#### Obtención de subcategorías:
- Se consultan las subcategorías con `parent_category_id` igual a la categoría base
- Se filtran solo las subcategorías con peso > 0

#### Clasificación por prioridad:
- **Alta prioridad**: `minimum_progress < 50%`
- **Media prioridad**: `minimum_progress < 90%`
- **Baja prioridad**: `minimum_progress ≥ 90%`

#### Distribución de preguntas por prioridad:
- **Alta prioridad**: 60% del total de preguntas
- **Media prioridad**: 30% del total de preguntas
- **Baja prioridad**: 10% del total de preguntas

### 6. Búsqueda de Preguntas Candidatas

El algoritmo realiza hasta 2 intentos para encontrar suficientes preguntas:

#### Intento 1: Preguntas no respondidas
- Se excluyen las preguntas ya respondidas por el usuario
- Se consulta la tabla `questions` con las categorías relevantes

#### Intento 2: Incluir preguntas respondidas (si es necesario)
- Si no se encontraron suficientes preguntas en el intento 1
- Se incluyen preguntas ya respondidas para completar el test

### 7. Procesamiento de Preguntas Candidatas

Para cada pregunta candidata:
- Se parsean las opciones de respuesta (JSON)
- Se mapea la dificultad de BD (1-5) a dificultad interna (1-4)
- Se filtran preguntas con opciones inválidas
- Se eliminan preguntas ya seleccionadas en intentos anteriores

### 8. Selección de Preguntas

#### Método A: Priorización por Categoría (cuando hay subcategorías)
- Se calcula la distribución de preguntas por subcategoría
- Se seleccionan preguntas siguiendo la distribución calculada
- Se priorizan subcategorías con menor `minimum_progress`

#### Método B: Selección por Dificultad (test genérico)
- Se agrupan preguntas por nivel de dificultad
- Se seleccionan preguntas siguiendo la distribución de dificultad calculada
- Si no hay suficientes preguntas, se realiza un relleno de respaldo

### 9. Relleno de Respaldo

Si no se alcanza el número objetivo de preguntas:
- Se añaden preguntas adicionales siguiendo el orden de dificultad [D1, D2, D3, D4]
- Se continúa hasta alcanzar `TOTAL_QUESTIONS_PER_TEST` o agotar candidatos

### 10. Finalización y Persistencia

#### Validación final:
- Se verifica que haya al menos 1 pregunta seleccionada
- Se trunca a 10 preguntas si hay más del objetivo
- Se mezclan aleatoriamente las preguntas seleccionadas

#### Creación del test:
- Se crea un registro en `test_executions`
- Se insertan las preguntas seleccionadas en `test_execution_answers`
- Se retorna el ID de la ejecución del test

## Métodos Auxiliares

### `mapDBDifficultyToInternal(dbDifficulty: number)`
- Mapea dificultad de BD (1-5) a dificultad interna (1-4)
- DB 4 y 5 se mapean a D4 interno

### `getDifficultyDistribution(successRate: number)`
- Calcula la distribución de dificultades basada en la tasa de éxito
- Retorna un objeto con el número de preguntas por nivel de dificultad

### `parseQuestionOptions(optionsFromDB: any)`
- Parsea las opciones de respuesta desde JSON
- Valida que cada opción tenga `key` y `value`

### `getPrioritizedSubcategories(userId: string, baseCategoryId: string)`
- Obtiene subcategorías de una categoría padre
- Las clasifica por prioridad basándose en `minimum_progress`
- Retorna lista ordenada por progreso ascendente

### `calculateQuestionDistribution(prioritizedSubcategories, totalQuestions)`
- Calcula cuántas preguntas asignar a cada subcategoría
- Distribuye según prioridad: 60% alta, 30% media, 10% baja

### `prioritizeQuestionsByCategory(questions, distribution)`
- Selecciona preguntas siguiendo la distribución por categoría
- Agrupa preguntas por categoría y selecciona según cuota asignada

## Casos de Error

- **Preguntas insuficientes**: Si no se pueden encontrar preguntas después de todos los intentos
- **Error de BD**: Fallos en consultas a la base de datos
- **Opciones inválidas**: Preguntas con opciones malformadas son filtradas
- **Categoría inexistente**: Se maneja con valores por defecto

## Logging y Monitoreo

El algoritmo incluye logging extensivo para:
- Seguimiento del flujo de ejecución
- Métricas de preguntas candidatas vs seleccionadas
- Distribución final de dificultades
- Tiempo de ejecución por fase
- Errores y advertencias

## Optimizaciones

- **Barajado aleatorio**: Se aplica en múltiples puntos para evitar patrones
- **Filtrado eficiente**: Se eliminan duplicados y preguntas inválidas tempranamente
- **Consultas optimizadas**: Se minimizan las consultas a BD usando joins y filtros
- **Fallbacks múltiples**: Sistema de respaldo para garantizar generación de tests

## Consideraciones de Rendimiento

- El algoritmo está optimizado para completarse en < 2 segundos
- Se limita a máximo 2 intentos de búsqueda para evitar loops infinitos
- Las consultas utilizan índices en `user_id`, `category_id` y `question_id`
- Se implementa cache en memoria para evitar recálculos 