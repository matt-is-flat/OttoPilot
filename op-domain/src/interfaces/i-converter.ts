export default interface IConverter<TIn, TOut> {
    Convert(input: TIn): TOut;
}