import { Category } from "../entities/Category";

export interface CategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategories(): Promise<Category[]>;
  getRootCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  getCategoriesByParentId(parentId: string): Promise<Category[]>;
  getTotalQuestionsForCategory(categoryId: string): Promise<number>;
  getPrioritizedSubcategories(userId: string, baseCategoryId: string): Promise<PrioritizedSubcategory[]>;
}

type Priority = 'high' | 'medium' | 'low';

interface PrioritizedSubcategory {
  categoryId: string;
  minimumProgress: number;
  priority: Priority;
  weight: number;
}

// Implementation of the repository
export class CategoryRepositoryImpl implements CategoryRepository {
  // Assuming supabase client is injected or passed
  constructor(private supabase: any) {}

  async getCategories(): Promise<Category[]> {
    // Logic copied from TestRepository
    const { data, error } = await this.supabase
      .from('categories')
      .select('*');

    if (error) throw error;
    // Ensure Category.fromDB is accessible here
    return data.map(Category.fromDB);
  }

  async getAllCategories(): Promise<Category[]> {
    // For now, delegates to getCategories
    return this.getCategories();
  }


  async getRootCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .is('parent_category_id', null); // Filter for root categories

    if (error) throw error;
    return data.map(Category.fromDB);
  }

  // Implementation for getCategoryById
  async getCategoryById(id: string): Promise<Category | null> {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle(); // Use maybeSingle() to return null if not found

    if (error) {
      console.error(`Error fetching category by id ${id}:`, error);
      // Decide error handling: throw or return null?
      // Returning null aligns with the interface Promise<Category | null>
      return null;
    }
    return data ? Category.fromDB(data) : null;
  }

  async getCategoriesByParentId(parentId: string): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('parent_category_id', parentId);

    if (error) {
      console.error(`Error fetching categories by parent id ${parentId}:`, error);
      throw error;
    }
    return data.map(Category.fromDB);
  }
  async getTotalQuestionsForCategory(categoryId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('categories')
      .leftJoin('questions', 'questions.category_id', 'categories.id')
      .select('categories.id, COUNT(questions.id) as total_questions')
      .eq('id', categoryId);

    if (error) {
      console.error(`Error fetching total questions for category ${categoryId}:`, error);
      throw error;
    }
    return data[0].total_questions;
  }

  async getPrioritizedSubcategories(userId: string, baseCategoryId: string): Promise<PrioritizedSubcategory[]> {
    const { data: subCategoriesData, error: subCatError } = await this.supabase
      .from('categories')
      .select('id, weight')
      .eq('parent_category_id', baseCategoryId);
    if (subCatError) throw subCatError;
    
    const subCategories = subCategoriesData || [];
    if (!subCategories || subCategories.length === 0) return [];
    
    const subcategoryIds = subCategories.map((sc: {id: string, weight: number}) => sc.id);
    
    const { data: performanceData, error: perfError } = await this.supabase
      .from('user_category_performance')
      .select('category_id, minimum_progress')
      .eq('user_id', userId)
      .in('category_id', subcategoryIds);
    if (perfError) throw perfError;
    
    const performanceMap = new Map<string, number>();
    const subcategoryPerformances = performanceData || [];
    subcategoryPerformances.forEach((perf: {category_id: string, minimum_progress: number}) => {
      performanceMap.set(perf.category_id, perf.minimum_progress || 0);
    });
    
    const prioritized = subCategories
      .filter((sc: {id: string, weight: number}) => sc.weight > 0)
      .map((sc: {id: string, weight: number}) => {
        const minimumProgress = performanceMap.get(sc.id) || 0;
        let priority: Priority = 'low';
        if (minimumProgress < 50) priority = 'high';
        else if (minimumProgress < 90) priority = 'medium';
        return { categoryId: sc.id, minimumProgress, priority, weight: sc.weight };
      })
      .sort((a: PrioritizedSubcategory, b: PrioritizedSubcategory) => a.minimumProgress - b.minimumProgress);
    return prioritized;
  }
} 