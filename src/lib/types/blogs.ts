// Blog API Types
export interface Blog {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface BlogPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// API Request Types
export interface GetBlogsRequest {
  page: number;
  pageSize: number;
}

export interface CreateBlogRequest {
  title: string;
  description: string;
}

export interface UpdateBlogRequest {
  title: string;
  description: string;
}

// API Response Types
export interface GetBlogsResponse {
  pagination: BlogPagination;
  items: Blog[];
}


