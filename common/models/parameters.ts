import { Selector } from '../types';

export interface IStageParameters { }

export class LoadPageParameters implements IStageParameters {
  pageUrl: string;
  timeout: number;
}

export class GetTextParameters implements IStageParameters {
  selectorType: Selector;
  selectorValue: string;
}

export class PrintVariableParameters implements IStageParameters {
  variableName: string;
}