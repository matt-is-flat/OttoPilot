export default interface IGenericRepository<TObject, TId, TFilter>  {
    Insert(data: TObject): Promise<void>;
    Update(data: TObject): Promise<void>;
    Delete(id: TId): Promise<void>;
    GetById(id: TId): Promise<TObject>;
    Get(filters: TFilter): Promise<TObject[]>;
}