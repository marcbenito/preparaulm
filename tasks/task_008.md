# Task 008: Refactorizar Consultas Supabase a Capa de Dominio

## 🎯 **Objetivo**

Refactorizar `src/app/test/[uid]/page.tsx` para eliminar todas las consultas directas a Supabase y moverlas a la capa de dominio, siguiendo la arquitectura existente del proyecto.

## 📋 **Descripción**

El archivo `src/app/test/[uid]/page.tsx` contenía múltiples consultas directas a Supabase, violando la arquitectura de capas del proyecto. Esta tarea consistió en mover toda la lógica de acceso a datos a la capa de dominio mediante casos de uso específicos.

## 🔍 **Problemas Identificados**

1. **Consultas directas a Supabase** en el componente de UI
2. **Violación de arquitectura**: Lógica de BD mezclada con presentación
3. **Inconsistencia de datos**: Entidades del dominio no coincidían con interfaces de página
4. **Duplicación de código**: Parsing de opciones JSONB en múltiples lugares

## ✅ **Cambios Implementados**

### **1. Actualización de Entidad Question**

- **Archivo**: `src/domain/entities/Question.ts`
- **Cambios**:
  - ✅ Agregada interfaz `QuestionOption` con `{key: string, value: string}`
  - ✅ Cambiado `options: string[]` a `options: QuestionOption[]`
  - ✅ Agregado método `parseDBOptions()` para parsing JSONB
  - ✅ Actualizado `fromDB()` para usar el nuevo parsing

### **2. Actualización de TestRepository**

- **Archivo**: `src/domain/repositories/TestRepository.ts`
- **Cambios**:
  - ✅ Agregado método `updateTestExecutionAnswer(id, updates)`
  - ✅ Implementada conversión camelCase ↔ snake_case
  - ✅ Soporte para actualizaciones parciales de respuestas

### **3. Casos de Uso Creados**

#### **GetTestExecutionDetailsUseCase**

- **Archivo**: `src/domain/use-cases/tests/GetTestExecutionDetailsUseCase.ts`
- **Interfaces**:

  ```typescript
  interface GetTestExecutionDetailsUseCaseParams {
    testExecutionId: number
  }

  interface QuestionWithAnswer {
    // Información de pregunta + respuesta combinada
    id
    text
    options
    correctAnswer
    categoryId
    explanation
    answerId
    selectedAnswer
    isCorrect
    observations
    isMarked
  }

  interface GetTestExecutionDetailsUseCaseResult {
    testExecution: TestExecution | null
    questionsWithAnswers: QuestionWithAnswer[]
    error?: string
  }
  ```

- **Funcionalidad**: Combina preguntas con respuestas en una sola estructura

#### **SaveTestAnswerUseCase**

- **Archivo**: `src/domain/use-cases/tests/SaveTestAnswerUseCase.ts`
- **Funcionalidad**: Guarda respuestas seleccionadas por el usuario

#### **ToggleMarkQuestionUseCase**

- **Archivo**: `src/domain/use-cases/tests/ToggleMarkQuestionUseCase.ts`
- **Funcionalidad**: Marca/desmarca preguntas para revisión

### **4. Refactorización Completa de page.tsx**

- **Archivo**: `src/app/test/[uid]/page.tsx`
- **Cambios**:
  - ❌ **Eliminadas** todas las consultas directas a Supabase
  - ❌ **Eliminadas** interfaces duplicadas locales
  - ❌ **Eliminada** función `parseDBQuestionOptions` local
  - ✅ **Implementados** casos de uso del dominio
  - ✅ **Mantenida** funcionalidad de optimistic updates
  - ✅ **Agregados** adaptadores para compatibilidad con componentes
  - ✅ **Reutilizado** `CompleteTestExecutionUseCase` existente

## 📁 **Archivos Modificados**

```
📁 MODIFICADOS:
├── src/domain/entities/Question.ts ✏️
├── src/domain/repositories/TestRepository.ts ✏️
├── src/app/test/[uid]/page.tsx ✏️

📁 CREADOS:
├── src/domain/use-cases/tests/GetTestExecutionDetailsUseCase.ts ➕
├── src/domain/use-cases/tests/SaveTestAnswerUseCase.ts ➕
├── src/domain/use-cases/tests/ToggleMarkQuestionUseCase.ts ➕
```

## 🧪 **Análisis de Impactos**

### **Rendimiento**

- ✅ **Positivo**: Lógica de BD centralizada y reutilizable
- ✅ **Positivo**: Mejor cache y manejo de errores
- ⚠️ **Neutral**: Misma cantidad de consultas BD
- ⚠️ **Mínimo**: Overhead por capas adicionales

### **Arquitectura**

- ✅ **Muy positivo**: Cumple con arquitectura de capas
- ✅ **Muy positivo**: Separación clara de responsabilidades
- ✅ **Muy positivo**: Casos de uso testables independientemente
- ✅ **Muy positivo**: Consistencia con resto del proyecto

### **Mantenibilidad**

- ✅ **Muy positivo**: Lógica BD centralizada
- ✅ **Muy positivo**: Reutilización de casos de uso
- ✅ **Muy positivo**: Interfaces claras y tipadas
- ✅ **Muy positivo**: Fácil testing y debugging

### **SEO**

- ✅ **Sin impacto**: Página cliente que requiere autenticación
- ✅ **Sin impacto**: No afecta indexación ni metadatos

## 🔧 **Detalles Técnicos**

### **Gestión de Estado Simplificada**

**Antes:**

```typescript
const [questions, setQuestions] = useState<Question[]>([])
const [answers, setAnswers] = useState<TestExecutionAnswer[]>([])
const [testExecution, setTestExecution] = useState<TestExecution | null>(null)
// Lógica compleja para sincronizar 3 arrays
```

**Después:**

```typescript
const [questionsWithAnswers, setQuestionsWithAnswers] = useState<
  QuestionWithAnswer[]
>([])
const [testExecution, setTestExecution] = useState<TestExecution | null>(null)
// Datos pre-combinados, estado más simple
```

### **Patrón de Casos de Uso**

Todos los casos de uso siguen el mismo patrón:

```typescript
export class UseCaseName {
  constructor(private repository: Repository) {}

  async execute(params: Params): Promise<Result> {
    // Lógica de negocio
  }

  static create(supabaseClient: SupabaseClient): UseCaseName {
    return new UseCaseName(new RepositoryImpl(supabaseClient))
  }
}
```

### **Compatibilidad con Componentes**

Se mantuvieron adaptadores para convertir entidades del dominio al formato esperado por componentes existentes:

```typescript
const testExecutionForComponents = testExecution
  ? {
      id: testExecution.id,
      test_id: testExecution.testId,
      user_id: testExecution.userId,
      // ... conversión de camelCase a snake_case
    }
  : null
```

## ✅ **Validación de Éxito**

1. ✅ **Eliminadas** todas las consultas directas de `page.tsx`
2. ✅ **Funcionalidad preservada** al 100%
3. ✅ **Optimistic updates** mantenidos
4. ✅ **Error handling** mejorado
5. ✅ **Arquitectura coherente** con el resto del proyecto
6. ✅ **Tipos seguros** end-to-end

## 🎯 **Resultados**

- **Separación de responsabilidades**: ✅ Completada
- **Arquitectura limpia**: ✅ Implementada
- **Reutilización de código**: ✅ Lograda
- **Mantenibilidad**: ✅ Mejorada significativamente
- **Testabilidad**: ✅ Casos de uso fácilmente testables

Esta refactorización establece un patrón claro para el resto del proyecto y facilita futuras mejoras y mantenimiento del código.
