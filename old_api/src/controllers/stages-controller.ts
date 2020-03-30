import * as uuid from 'uuid';

import { Stage } from '@common/models/stage';
import { DdbClient } from '../utils/ddb-client';
import { TableNames } from '../../../common/constants';
import { ExceptionMessages } from '../constants';

const dynamoDb = DdbClient();

/**
 * Creates a new stage
 * @param {Stage} stage The stage to create
 */
export async function CreateStage(stage: Stage): Promise<void> {
  const timestamp = new Date().getTime();

  const params = {
    TableName: TableNames.stages,
    Item: {
      id: uuid.v4(),
      opcode: stage.opcode,
      resultCode: stage.resultCode,
      parameters: stage.parameters,
      resultsStore: stage.resultStore,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  await dynamoDb.put(params).promise()
}

/**
 * Updates an existing stage
 * @param stage The stage to update
 * @throws Exception when existing stage cannot be found
 */
export async function UpdateStage(stage: Stage): Promise<void> {
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
      updatedAt: timestamp
    }
  }

  await dynamoDb.update(params).promise()
}

/**
 * Lists all stages
 * @returns {Stage[]} A list of all stages
 */
export async function GetStages(): Promise<Stage[]> {
  const params = {
    TableName: TableNames.stages
  }

  let result = await dynamoDb.scan(params).promise();
  let convertedItems = result.Items.map(item => item as Stage)

  return convertedItems;
}

/**
 * Gets a single stage by it's key id
 * @param {string} itemId The ID of the item to retrieve
 * @returns {Stage} The stage with the provided Id
 */
export async function GetStage(itemId: string): Promise<Stage> {
  const params = {
    TableName: TableNames.stages,
    Key: {
      id: itemId
    }
  };

  let result = await dynamoDb.get(params).promise();

  return result.Item as Stage;
}

/**
 * Deletes a stage by it's key id
 * @param {string} itemId THe ID of the item to retrieve
 */
export async function DeleteStage(itemId: string): Promise<void> {
  const params = {
    TableName: TableNames.stages,
    Key: {
      id: itemId
    }
  };

  await dynamoDb.delete(params).promise();
}