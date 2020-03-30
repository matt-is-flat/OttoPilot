export const TableNames = {
  stages: process.env.stagesTableName,
  flows: process.env.flowsTableName,
  flowStages: process.env.flowStagesTableName,
  flowMetadata: process.env.flowMetadataTableName
}

export const TYPES = {
  IFlowMetadataLogic: "IFlowMetadataLogic",
  IFlowStageLogic: "IFlowStageLogic",
  IFlowMetadataRepository: "IFlowMetadataRepository",
  IFlowStageRepository: "IFlowStageRepository"
}