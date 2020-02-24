import * as uuid from 'uuid';

import { Flow } from '@common/models/flow';
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

  const params = {
    TableName: TableNames.flows,
    Item: {
      id: uuid.v4(),
      name: flow.name,
      stages: flow.stages,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  await dynamoDb.put(params).promise()
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
    throw new Error(ExceptionMessages.ExistingFlowNotFound)
  }

  const params = {
    TableName: TableNames.flows,
    Key: {
      id: existingRecord.id
    },
    Item: {
      ...flow,
      updatedAt: timestamp
    }
  }

  await dynamoDb.update(params).promise()
}

/**
 * Lists all flows
 * @returns {Flow[]} A list of all flows
 */
export async function GetFlows(): Promise<Flow[]> {
  const params = {
    TableName: TableNames.flows
  }

  let result = await dynamoDb.scan(params).promise();
  let convertedItems = result.Items.map(item => item as Flow)

  return convertedItems;
}

/**
 * Gets a single flow by it's key id
 * @param {string} itemId The ID of the item to retrieve
 * @returns {Flow} The flow with the provided Id
 */
export async function GetFlow(itemId: string): Promise<Flow> {
  const params = {
    TableName: TableNames.flows,
    Key: {
      id: itemId
    }
  };

  let result = await dynamoDb.get(params).promise();

  return result.Item as Flow;
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