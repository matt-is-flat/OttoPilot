export const TableNames = {
  stages: process.env.stagesTableName,
  flows: process.env.flowsTableName,
  flowStages: process.env.flowStagesTableName,
  flowMetadata: process.env.flowMetadataTableName
}

export const TYPES = {
  IFlowMetadataLogic: "IFlowMetadataLogic",
  IFlowStageLogic: "IFlowStageLogic",
  IFlowLogic: "IFlowLogic",
  IFlowMetadataRepository: "IFlowMetadataRepository",
  IFlowStageRepository: "IFlowStageRepository",
  "IValidator<any>": "IValidator<any>",
  "IConverter<any, Flow>": "IConverter<any, Flow>",
  "IConverter<any, FlowMetadata>": "IConverter<any, FlowMetadata>",
  "IConverter<any, FlowStage>": "IConverter<any, FlowStage>",
  "IFactory<string, IValidator<any>>": "IFactory<string, IValidator<any>>"
}