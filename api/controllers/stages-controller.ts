import * as uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';

import Stage from '../../common/models/stage';
import { TableNames } from '../../common/constants';
import { ExceptionMessages } from '../constants';

const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Creates a new stage
 */
export async function CreateStage(stage: Stage) {
  const timestamp = new Date().getTime();

  const params = {
    TableName: TableNames.stages,
    Item: {
      id: uuid.v1(),
      opcode: stage.opcode,
      parameters: stage.parameters,
      resultsStore: stage.resultStore,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  let result = await dynamoDb.put(params).promise()

  return result;
}

/**
 * Updates an existing stage
 * @param stage The stage to update
 * @throws Exception when existing stage cannot be found
 */
export async function UpdateStage(stage: Stage) {
  const timestamp = new Date().getTime();
  let existingRecord = await GetStage(stage.id);

  if (!existingRecord) {
    throw new Error(ExceptionMessages.ExistingStageNotFound)
  }

  const params = {
    TableName: TableNames.stages,
    Key: {
      id: existingRecord.id
    },
    Item: {
      ...stage,
      createdAt: existingRecord.createdAt,
      updatedAt: timestamp
    }
  }

  let result = await dynamoDb.update(params).promise()
}

/**
 * Lists all stages
 */
export async function GetStages() {
  const params = {
    TableName: TableNames.stages
  }

  let result = await dynamoDb.scan(params).promise();

  return result;
}

/**
 * Gets a single stage by it's key id
 * @param itemId The Id of the item to retrieve
 */
export async function GetStage(itemId: string): Promise<Stage> {
  const params = {
    TableName: TableNames.stages,
    Key: {
      id: itemId
    }
  }

  let result = await dynamoDb.get(params).promise();

  return new Stage();
}