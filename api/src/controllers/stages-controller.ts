import * as uuid from 'uuid';

import Stage from '../../../common/models/stage';
import DdbClient from '../utils/ddb-client';
import { TableNames } from '../../../common/constants';
import { ExceptionMessages } from '../constants';
import { IStageResults } from '../../../common/models/results';
import { IStageParameters } from '../../../common/models/parameters';

const dynamoDb = DdbClient();

/**
 * Creates a new stage
 */
export async function CreateStage(stage: Stage<IStageParameters, IStageResults>): Promise<void> {
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

  await dynamoDb.put(params).promise()
}

/**
 * Updates an existing stage
 * @param stage The stage to update
 * @throws Exception when existing stage cannot be found
 */
export async function UpdateStage(stage: Stage<IStageParameters, IStageResults>): Promise<void> {
  // const timestamp = new Date().getTime();
  // let existingRecord = await GetStage(stage.id);

  // if (!existingRecord) {
  //   throw new Error(ExceptionMessages.ExistingStageNotFound)
  // }

  // const params = {
  //   TableName: TableNames.stages,
  //   Key: {
  //     id: existingRecord.id
  //   },
  //   Item: {
  //     ...stage,
  //     createdAt: existingRecord.createdAt,
  //     updatedAt: timestamp
  //   }
  // }

  // let result = await dynamoDb.update(params).promise()
}

/**
 * Lists all stages
 */
export async function GetStages(): Promise<Stage<IStageParameters, IStageResults>[]> {
  const params = {
    TableName: TableNames.stages
  }

  let result = await dynamoDb.scan(params).promise();
  let convertedItems = result.Items.map(item => item as Stage<IStageParameters, IStageResults>)

  return convertedItems;
}

/**
 * Gets a single stage by it's key id
 * @param itemId The Id of the item to retrieve
 */
export async function GetStage(itemId: string): Promise<Stage<IStageParameters, IStageResults>> {
  const params = {
    TableName: TableNames.stages,
    Key: {
      id: itemId
    }
  }

  let result = await dynamoDb.get(params).promise();

  return result.Item as Stage<IStageParameters, IStageResults>;
}