export default interface IBaseLogic<TObject, TId> {
    Save(data: TObject): Promise<void>;
    Delete(id: TId): Promise<void>;
    GetById(id: TId): Promise<TObject>;
    Get(filters: TObject): Promise<TObject[]>;
}