export interface GetPagedResponse<T> 
{
    pagedItemsList: T[];
    totalCount: number;
    totalPages: number;
}
  