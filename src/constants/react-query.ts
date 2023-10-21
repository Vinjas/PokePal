export const DEFAULT_QUERY_OPTIONS = {
  queries: {
    cacheTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Hasta 30 segundos
    staleTime: 10000 // 10 segundos
  }
};

export const RQ_KEY = {
  ALL_POKEMON_LISTS: 'ALL_POKEMON_LISTS',
  POKEMON_DATA: 'POKEMON_DATA'
};
