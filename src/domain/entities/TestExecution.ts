export class TestExecutionAnswer {
  constructor(
    public id: number,
    public testExecutionId: number,
    public questionId: number,
    public selectedAnswer: string | null,
    public isCorrect: boolean | null,
    public observations: string | null,
    public isMarked: boolean,
    public categoryId: string,
    public difficulty: number
  ) {}

  static fromDB(data: any): TestExecutionAnswer {
    return new TestExecutionAnswer(
      data.id,
      data.test_execution_id,
      data.question_id,
      data.selected_answer,
      data.is_correct,
      data.observations,
      data.is_marked,
      data.questions?.category_id || null,
      data.questions?.difficulty || null
    );
  }

  toDB() {
    return {
      id: this.id,
      test_execution_id: this.testExecutionId,
      question_id: this.questionId,
      selected_answer: this.selectedAnswer,
      is_correct: this.isCorrect,
      observations: this.observations,
      is_marked: this.isMarked,
      category_id: this.categoryId,
      difficulty: this.difficulty
    };
  }
}

export class TestExecution {
  constructor(
    public id: number,
    public testId: number,
    public userId: string,
    public categoryId: string | null,
    public createdAt: Date,
    public completedAt: Date | null,
    public score: number | null,
    public answers: TestExecutionAnswer[] = []
  ) {}

  static fromDB(data: any): TestExecution {
    return new TestExecution(
      data.id,
      data.test_id,
      data.user_id,
      data.category_id,
      new Date(data.created_at),
      data.completed_at ? new Date(data.completed_at) : null,
      data.score,
      data.answers?.map(TestExecutionAnswer.fromDB) || []
    );
  }

  toDB() {
    return {
      id: this.id,
      test_id: this.testId,
      user_id: this.userId,
      category_id: this.categoryId,
      created_at: this.createdAt.toISOString(),
      completed_at: this.completedAt?.toISOString() || null,
      score: this.score,
    };
  }
} 