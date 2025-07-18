export class Category {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public iconName: string | null,
    public color: string | null,
    public parentCategoryId: string | null,
    public totalQuestions: number
  ) {}

  static fromDB(data: any): Category {
    return new Category(
      data.id,
      data.name,
      data.description,
      data.icon_name,
      data.color,
      data.parent_category_id,
      data.total_questions
    );
  }

  toDB() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      icon_name: this.iconName,
      color: this.color,
      parent_category_id: this.parentCategoryId,
      total_questions: this.totalQuestions
    };
  }
} 