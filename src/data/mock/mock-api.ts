import categoriesData from './categories.json';
import productsData from './products.json';
import type { Category } from '@/features/catalog/useCategories';
import { ProductCard } from '@/shared/schemas/product-card-schema';

export interface MockProductsResponse {
  items: ProductCard[];
  total: number;
}

export const mockApi = {
  getProducts: async ({
    categoryIds = [],
    countries = [],
    sortBy,
    page = 1,
    searchTerm = '',
    limit = 8,
  }: {
    categoryIds?: string[];
    countries?: string[];
    sortBy?: string;
    page?: number;
    searchTerm?: string;
    limit?: number;
  }): Promise<MockProductsResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    let filtered = [...productsData];

    // Filter by categories
    if (categoryIds.length > 0) {
      filtered = filtered.filter((product) =>
        product.categoryIds.some((catId) => categoryIds.includes(catId)),
      );
    }

    // Filter by countries
    if (countries.length > 0) {
      filtered = filtered.filter((product) =>
        countries.includes(product.country),
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.country.toLowerCase().includes(searchLower),
      );
    }

    // Sort
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          filtered.sort(
            (a, b) =>
              (a.discountedPrice || a.price) - (b.discountedPrice || b.price),
          );
          break;
        case 'price_desc':
          filtered.sort(
            (a, b) =>
              (b.discountedPrice || b.price) - (a.discountedPrice || a.price),
          );
          break;
        case 'rating_desc':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'rating_asc':
          filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
          break;
        case 'year_desc':
          filtered.sort((a, b) => {
            const yearA = a.year === 'NV' ? 0 : parseInt(a.year);
            const yearB = b.year === 'NV' ? 0 : parseInt(b.year);
            return yearB - yearA;
          });
          break;
        case 'year_asc':
          filtered.sort((a, b) => {
            const yearA = a.year === 'NV' ? 0 : parseInt(a.year);
            const yearB = b.year === 'NV' ? 0 : parseInt(b.year);
            return yearA - yearB;
          });
          break;
      }
    }

    const total = filtered.length;
    const offset = (page - 1) * limit;
    const items = filtered.slice(offset, offset + limit);

    return { items, total };
  },

  getProductById: async (id: string): Promise<ProductCard | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return productsData.find((p) => p.id === id) || null;
  },

  getCategories: async (): Promise<Category[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return categoriesData;
  },

  getFeaturedProducts: async (limit = 12): Promise<ProductCard[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    // Select products with high ratings and good images
    const featured = productsData.filter(
      (p) => p.rating >= 4.5 && !p.image.includes('.svg'),
    );
    return featured.slice(0, limit);
  },
};
