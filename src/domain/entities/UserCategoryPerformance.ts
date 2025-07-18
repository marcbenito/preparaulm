export class UserCategoryPerformance {
  constructor(
    public id: number,
    public userId: string,
    public categoryId: string,
    public successRate: number,
    public lastTestDate: Date,
    public testsCompleted: number,
    public questionsCompleted: number,
    public questionsSuccess: number = 0,
    public questionsCompletedPond: number = 0,
    public questionsSuccessPond: number = 0,
    public minimumProgress: number = 0,
    public confidence: number = 0,
    public weight: number = 0
  ) {}

  static fromDB(data: any): UserCategoryPerformance {
    return new UserCategoryPerformance(
      data.id,
      data.user_id,
      data.category_id,
      data.success_rate,
      data.last_test_date ? new Date(data.last_test_date) : new Date(),
      data.tests_completed,
      data.questions_completed,
      data.questions_success || 0,
      data.questions_total_pond || 0,
      data.questions_success_pond || 0,
      data.minimum_progress || 0,
      data.confidence || 0,
      data.categories?.weight || 0
    );
  }

  toDB() {
    return {
      id: this.id,
      user_id: this.userId,
      category_id: this.categoryId,
      success_rate: this.successRate,
      last_test_date: this.lastTestDate,
      tests_completed: this.testsCompleted,
      questions_completed: this.questionsCompleted,
      questions_total_pond: this.questionsCompletedPond,
      questions_success_pond: this.questionsSuccessPond,
      minimum_progress: this.minimumProgress,
      confidence: this.confidence,
      weight: this.weight
    };
  }
} 