import { Category } from "../entities/Category"
import { CategoryRepository } from "../repositories/CategoryRepository"

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.getCategories()
  }
} 