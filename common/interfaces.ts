import { FlowMetadata } from "./models/flow-metadata";
import { FlowStage } from "./models/flow-stage";

export interface IStageParameters { }

export interface IResultParameters { }

export interface IGenericRepository<TObject, TId> {
    Insert(data: TObject): Promise<void>;
    Update(data: TObject): Promise<void>;
    Delete(id: TId): Promise<void>;
    GetById(id: TId): Promise<TObject>;
    Get(filters: TObject): Promise<TObject[]>;
}

export interface IFlowMetadataRepository extends IGenericRepository<FlowMetadata, string> { }

export interface IFlowStagesRepository extends IGenericRepository<FlowStage, string> { }