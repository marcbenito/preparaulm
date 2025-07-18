export type QuestionOption = {
  key: string
  value: string
}

export type Question = {
  id: number
  text: string
  options: QuestionOption[] | any
  correct_answer: string
  category_id: string
}

export type TestExecution = {
  id: number
  test_id: number | null
  user_id: string
  created_at: string
  completed_at: string | null
  score: number | null
  status: string | null
}

export type TestExecutionAnswer = {
  id: number
  test_execution_id: number
  question_id: number
  selected_answer: string | null
  is_correct: boolean | null
  observations: string | null
  is_marked: boolean
} 