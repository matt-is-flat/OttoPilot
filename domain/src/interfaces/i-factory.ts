export default interface IFactory<TIn, TOut> {
    Create(input: TIn): TOut
}