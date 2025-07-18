export interface QuestionOption {
  key: string
  value: string
}

// Enum para facilitar el uso de niveles de dificultad
export enum QuestionDifficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3
}

export class Question {
  constructor(
    public id: number,
    public categoryId: string,
    public text: string,
    public options: QuestionOption[],
    public correctAnswer: string,
    public explanation: string | null,
    public difficulty: QuestionDifficulty
  ) {}

  static fromDB(data: any): Question {
    return new Question(
      data.id,
      data.category_id,
      data.text,
      Question.parseDBOptions(data.options),
      data.correct_answer,
      data.explanation,
      data.difficulty
    );
  }

  private static parseDBOptions(optionsFromDB: any): QuestionOption[] {
    if (typeof optionsFromDB === "string") {
      try {
        const parsed = JSON.parse(optionsFromDB)
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (opt) =>
              opt && typeof opt.key === "string" && typeof opt.value === "string",
          )
        ) {
          return parsed as QuestionOption[]
        }
      } catch (e) {
        console.error("Question.fromDB: Failed to parse question options string:", e)
      }
    } else if (
      Array.isArray(optionsFromDB) &&
      optionsFromDB.every(
        (opt) =>
          opt && typeof opt.key === "string" && typeof opt.value === "string",
      )
    ) {
      return optionsFromDB as QuestionOption[]
    }
    console.warn(
      "Question.fromDB: Question options are not in expected format, returning empty array.",
    )
    return []
  }

  toDB() {
    return {
      id: this.id,
      category_id: this.categoryId,
      text: this.text,
      options: this.options,
      correct_answer: this.correctAnswer,
      explanation: this.explanation,
      difficulty: this.difficulty
    };
  }
} 