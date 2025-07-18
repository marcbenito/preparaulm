import { Category } from "../entities/Category";
import mainCategories from "../data/main-categories.json";
import { SupabaseClient } from "@supabase/supabase-js";

export class GetMainCategoriesUseCase {
  constructor() {}

  async execute(): Promise<Category[]> {
    // Convertir las categorías del JSON a instancias de Category
    return mainCategories.map(
      (cat) =>
        new Category(
          cat.id,
          cat.name,
          cat.description,
          cat.iconName,
          cat.color,
          cat.parentCategoryId,
          cat.totalQuestions
        )
    );
  }

  static create(supabase: SupabaseClient): GetMainCategoriesUseCase {
    return new GetMainCategoriesUseCase();
  }
} 