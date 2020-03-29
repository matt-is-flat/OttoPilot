import * as uuid from 'uuid';

import { Flow } from '@common/models/flow';
import { FlowMetadata } from '@common/models/flow-metadata';
import { FlowStage } from '@common/models/flow-stage';
import { DdbClient } from '../utils/ddb-client';
import { TableNames } from '../../../common/constants';
import { ExceptionMessages } from '../constants';

const dynamoDb = DdbClient();

/**
 * Creates a new flow
 * @param {Flow} flow The flow to create
 */
export async function CreateFlow(flow: Flow): Promise<void> {
  const timestamp = new Date().getTime();
  const flowId = uuid.v4();

  const metadataParams = {
    TableName: TableNames.flowMetadata,
    Item: {
      flowId: flowId,
      flowName: flow.metadata.name,
      createdAt: timestamp,
      modifiedAt: timestamp
    }
  };

  await dynamoDb.put(metadataParams).promise();

  for (let stage of flow.stages) {
    const flowStageParams = {
      TableName: TableNames.flowStages,
      Item: {
        flowId: flowId,
        stageId: uuid.v4(),
        order: stage.order,
        stageParameters: stage.stageParametes,
        resultCode: stage.resultCode,
        resultParameters: stage.resultParameters
      }
    };
  
    await dynamoDb.put(flowStageParams).promise();
  }
}

/**
 * Updates an existing flow
 * @param {Flow} flow The flow to update
 * @throws Exception when existing flow cannot be found
 */
export async function UpdateFlow(flow: Flow): Promise<void> {
  const timestamp = new Date().getTime();
  let existingRecord = await GetFlow(flow.id);

  if (!existingRecord) {
    throw new Error(ExceptionMessages.ExistingFlowNotFound);
  }

  const metadataParams = {
    TableName: TableNames.flowMetadata,
    Key: {
      flowId: flow.id
    },
    UpdateExpression: "set flowName = :flowName, modifiedAt = :modifiedAt",
    ExpressionAttributeValues: {
      ":flowName": flow.metadata.name,
      ":modifiedAt": timestamp
    }
  };

  console.log(metadataParams);

  let result = await dynamoDb.update(metadataParams).promise();
  console.log(result);
  
  for (let stage of flow.stages) {
    const stageParams = {
      TableName: TableNames.flowStages,
      Key: {
        flowId: flow.id,
        order: stage.order
      },
      Item: {
        ...stage
      }
    }

    await dynamoDb.update(stageParams).promise();
  }
}

/**
 * Lists all flows
 * @returns {Flow[]} A list of all flows
 */
export async function GetFlows(): Promise<Flow[]> {
  let flows: Flow[] = [];

  const metadataParams = {
    TableName: TableNames.flowMetadata
  };

  const flowStageParams = {
    TableName: TableNames.flowStages
  };

  let metadataResult = await dynamoDb.scan(metadataParams).promise()
  let flowStageResult = await dynamoDb.scan(flowStageParams).promise();
  let metadataItems = metadataResult.Items.map(item => item as FlowMetadata);
  let flowStages = flowStageResult.Items.map(item => item as FlowStage);

  for (let metadata of metadataItems) {
    let flow: Flow = {
      id: metadata.flowId,
      metadata: metadata,
      stages: []
    };

    flow.stages = flowStages.filter(flowStage => flowStage.flowId == flow.id);
    flows.push(flow);
  }

  return flows;
}

/**
 * Gets a single flow by it's key id
 * @param {string} itemId The ID of the item to retrieve
 * @returns {Flow} The flow with the provided Id
 */
export async function GetFlow(id: string): Promise<Flow> {
  const metadataParams = {
    TableName: TableNames.flowMetadata,
    Key: {
      flowId: id
    }
  };

  const flowStageParams = {
    TableName: TableNames.flowStages,
    KeyConditionExpression: '#flowId = :flowId',
    ExpressionAttributeNames: {
      '#flowId': 'flowId'
    },
    ExpressionAttributeValues: {
      ':flowId': id
    }
  };

  let metadata = (await dynamoDb.get(metadataParams).promise()).Item as FlowMetadata;
  let flowStages = (await dynamoDb.query(flowStageParams).promise()).Items.map(item => item as FlowStage);

  let flow: Flow = {
    id: metadata.flowId,
    metadata: metadata,
    stages: flowStages
  };

  return flow;
}

/**
 * Deletes a flow by it's key id
 * @param {string} itemId The ID of the item to retrieve
 */
export async function DeleteFlow(itemId: string): Promise<void> {
  const params = {
    TableName: TableNames.flows,
    Key: {
      id: itemId
    }
  };

  await dynamoDb.delete(params).promise();
}