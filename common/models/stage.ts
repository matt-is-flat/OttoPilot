export default class Stage<TParameters, TResults> {
  id: string;
  opcode: string;
  resultCode: string;
  parameters: TParameters;
  resultStore: TResults;
  createdAt: Date;
  updatedAt: Date;
}