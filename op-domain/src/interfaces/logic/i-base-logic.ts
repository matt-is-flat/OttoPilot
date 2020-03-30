export default interface IBaseLogic<TObject, TId, TFilter> {
    Save(data: TObject): Promise<void>;
    Delete(id: TId): Promise<void>;
    GetById(id: TId): Promise<TObject>;
    Get(filters: TFilter): Promise<TObject[]>;
}