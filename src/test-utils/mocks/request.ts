export type Request = {
  searchQuery: string;
  currentPage: number;
};

export const mockRequest: Request = {
  searchQuery: 'Skywalker',
  currentPage: 1,
};

export const emptyMockRequest: Request = {
  searchQuery: '',
  currentPage: 1,
};
