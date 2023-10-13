export const DEFAULT_QUERY_OPTIONS = {
  queries: {
    cacheTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Hasta 30 segundos
    staleTime: 10000 // 10 segundos
  }
};
export const PRODUCT_BY_SKU = 'PRODUCT_BY_SKU_';
export const ALL_CATEGORIES = 'ALL_CATEGORIES';
export const ALL_BRANDS = 'ALL_BRANDS';
export const ALL_INGREDIENTS = 'ALL_INGREDIENTS';
