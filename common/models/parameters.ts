import { Selector } from '../types';

export interface IStageParameters { }

export class GetTextParameters implements IStageParameters {
  selectorType: Selector;
  selectorValue: string;
}