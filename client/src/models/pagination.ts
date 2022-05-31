export interface MetaData{
    currentPage:number;
    pageSize:number;
    totalPages:number;
    totalCount:number;
}
export class PaginatedResponse<T>{

    constructor(public items:T, public metaData:MetaData){
      this.items=items;
      this.metaData = metaData
    }
}