import * as uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { TableNames } from '../../common/constants';
const dynamoDb = new DynamoDB.DocumentClient();
/**
 * POST /stages
 * Creates a new stage
 */
export async function CreateStage(stage) {
    console.log("in create stage");
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
    };
    var result = await dynamoDb.put(params).promise();
    return result;
}
/**
 * GET /stages
 * Lists all stages
 */
export async function GetStages() {
    const params = {
        TableName: TableNames.stages
    };
    var result = await dynamoDb.scan(params).promise();
    return result;
}
/**
 * GET /stages?id=xyz
 * Gets a single record by it's key id
 * @param itemId The Id of the item to retrieve
 */
export async function GetStage(itemId) {
    const params = {
        TableName: TableNames.stages,
        Key: {
            id: itemId
        }
    };
    var result = await dynamoDb.get(params).promise();
    return result;
}
//# sourceMappingURL=stages-controller.js.map