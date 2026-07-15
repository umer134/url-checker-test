export const API_ENDPOINTS = {
  JOBS: {
    CREATE: `/jobs`,
    GET_ALL: `/jobs`,
    GET_ONE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
  },
} as const;
