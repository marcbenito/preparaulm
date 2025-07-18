export class TestQuestion {
  constructor(
    public testId: number,
    public questionId: number,
    public orderNum: number
  ) {}

  static fromDB(data: any): TestQuestion {
    return new TestQuestion(
      data.test_id,
      data.question_id,
      data.order_num
    );
  }

  toDB() {
    return {
      test_id: this.testId,
      question_id: this.questionId,
      order_num: this.orderNum
    };
  }
}

export class Test {
  constructor(
    public id: number,
    public title: string,
    public categoryId: string | null,
    public createdAt: Date,
    public durationSeconds: number,
    public questions: TestQuestion[] = []
  ) {}

  static fromDB(data: any): Test {
    return new Test(
      data.id,
      data.title || `Test ${data.id}`,
      data.category_id,
      new Date(data.created_at),
      data.duration_seconds,
      data.questions?.map(TestQuestion.fromDB) || []
    );
  }

  toDB() {
    return {
      id: this.id,
      title: this.title,
      category_id: this.categoryId,
      created_at: this.createdAt.toISOString(),
      duration_seconds: this.durationSeconds
    };
  }

  get timeLimit(): number {
    return Math.ceil(this.durationSeconds / 60);
  }
} 