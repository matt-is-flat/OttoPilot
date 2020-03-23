export const Opcodes = {
  loadPage: "LOADPAGE",
  getText: "GETTEXT",
  printVariable: "PRINTVAR",
  clickElement: "CLICK",
  typeKeys: "TYPEKEYS"
}

export const ResultCodes = {
  saveLocal: "SAVELOCAL",
  saveDynamo: "SAVEDDB",
  saveTextFile: "SAVETXT"
}

export const TableNames = {
  stages: process.env.stagesTableName,
  flows: process.env.flowsTableName,
  flowStages: process.env.flowStagesTableName,
  flowMetadata: process.env.flowMetadataTableName
}