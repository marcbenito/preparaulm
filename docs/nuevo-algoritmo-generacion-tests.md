# Propuesta: Nuevo Algoritmo Unificado de Generación de Tests

## Objetivo
Unificar el algoritmo de generación de tests para que sea el mismo proceso tanto para tests genéricos como para tests por categoría, con la única diferencia siendo la distribución inicial de preguntas por categoría.

## Estructura del Nuevo Algoritmo

### 1. Encapsulación de Queries (Funciones a crear)

```typescript
// Queries de datos del usuario
private async getUserAnsweredQuestions(userId: string): Promise<Set<number>>
private async getUserCategoryPerformance(userId: string, categoryId: string): Promise<number>
private async getUserAllCategoriesPerformance(userId: string): Promise<number>

// Queries de categorías
private async getCategorySubcategories(categoryId: string): Promise<CategoryInfo[]>
private async getSubcategoryPerformances(userId: string, subcategoryIds: string[]): Promise<Map<string, number>>
private async getAllRootCategories(): Promise<CategoryInfo[]>

// Queries de preguntas
private async getCandidateQuestions(categoryIds: string[], excludeQuestionIds: Set<number>, includeAnswered: boolean): Promise<QuestionFromDB[]>

// Queries de persistencia
private async createTestExecution(userId: string): Promise<number>
private async saveTestQuestions(testExecutionId: number, questions: SelectedQuestionInternal[]): Promise<void>
```

### 2. Flujo Principal Unificado

```
┌─────────────────────────────────────────────────────────────┐
│                    ALGORITMO UNIFICADO                      │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│           1. INICIALIZACIÓN Y DATOS BÁSICOS                │
│  • getUserAnsweredQuestions(userId)                        │
│  • Determinar si es test genérico o por categoría          │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│      2. CÁLCULO DE DISTRIBUCIÓN DE PREGUNTAS POR CATEGORÍA │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐│
│  │   Test por Categoría│    │      Test Genérico          ││
│  │                     │    │                             ││
│  │ • 10 preguntas para │    │ • Obtener todas las         ││
│  │   la categoría      │    │   categorías root           ││
│  │   especificada      │    │ • Distribuir 10 preguntas  ││
│  │                     │    │   entre todas las categorías││
│  │ • Si tiene subcats: │    │   basándose en performance  ││
│  │   distribuir entre  │    │   y pesos                   ││
│  │   subcategorías     │    │                             ││
│  └─────────────────────┘    └─────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│           3. CÁLCULO DE SUCCESS RATE GLOBAL                │
│  • Para cada categoría en la distribución                  │
│  • getUserCategoryPerformance() o promedio general         │
│  • Calcular success rate ponderado                         │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│        4. SELECCIÓN DE PREGUNTAS POR CATEGORÍA             │
│                                                             │
│  Para cada categoría en la distribución:                   │
│  • selectQuestionsForCategory(categoryId, numQuestions,    │
│    successRate, excludedQuestions)                         │
│                                                             │
│  Subproceso selectQuestionsForCategory:                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Calcular distribución de dificultad              │   │
│  │ 2. Obtener preguntas candidatas                     │   │
│  │ 3. Filtrar y procesar preguntas                     │   │
│  │ 4. Seleccionar por dificultad                       │   │
│  │ 5. Aplicar fallbacks si es necesario                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│              5. FINALIZACIÓN Y PERSISTENCIA                │
│  • Combinar preguntas de todas las categorías              │
│  • Validar total de preguntas                              │
│  • Mezclar aleatoriamente                                  │
│  • createTestExecution()                                   │
│  • saveTestQuestions()                                     │
└─────────────────────────────────────────────────────────────┘
```

### 3. Métodos Principales

#### 3.1 Método Principal
```typescript
async execute({ userId, baseCategoryId }: GenerateTestParams): Promise<number> {
  // 1. Inicialización
  const answeredQuestions = await this.getUserAnsweredQuestions(userId);
  
  // 2. Calcular distribución de preguntas por categoría
  const categoryDistribution = await this.calculateCategoryDistribution(userId, baseCategoryId);
  
  // 3. Seleccionar preguntas para cada categoría
  const selectedQuestions: SelectedQuestionInternal[] = [];
  
  for (const [categoryId, numQuestions] of Object.entries(categoryDistribution)) {
    const successRate = await this.getUserCategoryPerformance(userId, categoryId);
    const categoryQuestions = await this.selectQuestionsForCategory(
      categoryId, 
      numQuestions, 
      successRate, 
      answeredQuestions
    );
    selectedQuestions.push(...categoryQuestions);
  }
  
  // 4. Finalizar y persistir
  return await this.finalizeAndPersistTest(userId, selectedQuestions);
}
```

#### 3.2 Cálculo de Distribución de Categorías
```typescript
private async calculateCategoryDistribution(userId: string, baseCategoryId?: string): Promise<Record<string, number>> {
  if (baseCategoryId) {
    // Test por categoría específica
    const subcategories = await this.getCategorySubcategories(baseCategoryId);
    
    if (subcategories.length > 0) {
      // Tiene subcategorías: distribuir entre ellas
      const subcategoryPerformances = await this.getSubcategoryPerformances(
        userId, 
        subcategories.map(sc => sc.id)
      );
      return this.distributeQuestionsBySubcategory(subcategories, subcategoryPerformances, 10);
    } else {
      // No tiene subcategorías: todas las preguntas para la categoría
      return { [baseCategoryId]: 10 };
    }
  } else {
    // Test genérico: distribuir entre todas las categorías root
    const rootCategories = await this.getAllRootCategories();
    const allPerformances = await this.getUserAllCategoriesPerformance(userId);
    return this.distributeQuestionsByRootCategory(rootCategories, allPerformances, 10);
  }
}
```

#### 3.3 Selección de Preguntas por Categoría (Subproceso)
```typescript
private async selectQuestionsForCategory(
  categoryId: string, 
  numQuestions: number, 
  successRate: number, 
  excludedQuestions: Set<number>
): Promise<SelectedQuestionInternal[]> {
  
  // 1. Calcular distribución de dificultad para esta categoría
  const difficultyDistribution = this.getDifficultyDistribution(successRate);
  
  // 2. Obtener preguntas candidatas (con intentos de fallback)
  const candidateQuestions = await this.getCandidateQuestionsWithFallback(
    [categoryId], 
    excludedQuestions
  );
  
  // 3. Procesar y filtrar preguntas
  const processedQuestions = this.processQuestions(candidateQuestions);
  
  // 4. Seleccionar por dificultad
  const selectedQuestions = this.selectQuestionsByDifficulty(
    processedQuestions, 
    difficultyDistribution, 
    numQuestions
  );
  
  // 5. Actualizar preguntas excluidas para próximas categorías
  selectedQuestions.forEach(q => excludedQuestions.add(q.id));
  
  return selectedQuestions;
}
```

### 4. Ventajas del Nuevo Algoritmo

#### 4.1 Simplicidad
- **Un solo flujo**: Mismo proceso para ambos tipos de test
- **Menos duplicación**: Eliminación de lógica duplicada
- **Más mantenible**: Cambios en un solo lugar

#### 4.2 Flexibilidad
- **Escalable**: Fácil añadir nuevos tipos de test
- **Configurable**: Distribución de preguntas por categoría personalizable
- **Modular**: Cada función tiene una responsabilidad específica

#### 4.3 Testabilidad
- **Queries encapsuladas**: Fácil mockear para tests unitarios
- **Funciones puras**: Lógica de distribución sin efectos secundarios
- **Separación de responsabilidades**: Cada método hace una cosa específica

### 5. Cambios Requeridos

#### 5.1 Refactorización de Queries
- Extraer todas las queries directas a métodos privados
- Estandarizar manejo de errores
- Añadir logging consistente

#### 5.2 Nuevo Método de Distribución
- `calculateCategoryDistribution()`: Lógica unificada de distribución
- `distributeQuestionsBySubcategory()`: Para tests por categoría
- `distributeQuestionsByRootCategory()`: Para tests genéricos

#### 5.3 Subproceso de Selección
- `selectQuestionsForCategory()`: Selección por categoría individual
- `getCandidateQuestionsWithFallback()`: Búsqueda con fallbacks
- `selectQuestionsByDifficulty()`: Selección por dificultad

#### 5.4 Simplificación del Método Principal
- Eliminar lógica condicional compleja
- Usar composición de funciones
- Mejorar legibilidad y mantenibilidad

### 6. Backward Compatibility

El nuevo algoritmo mantendrá la misma interfaz pública:
- Mismos parámetros de entrada
- Mismo valor de retorno
- Mismo comportamiento observable
- Misma calidad de tests generados

### 7. Plan de Implementación

1. **Fase 1**: Encapsular queries existentes
2. **Fase 2**: Crear método de distribución unificado
3. **Fase 3**: Implementar subproceso de selección por categoría
4. **Fase 4**: Refactorizar método principal
5. **Fase 5**: Testing y optimización
6. **Fase 6**: Limpieza y documentación

¿Te parece bien esta propuesta? ¿Hay algún aspecto que quieras que modifique o amplíe? 