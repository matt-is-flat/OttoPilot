import { DynamoDB } from 'aws-sdk';

export function DdbClient(): DynamoDB.DocumentClient {
  if (process.env.ddbEndpoint) {
    return new DynamoDB.DocumentClient({ 
      region: process.env.ddbRegion,
      endpoint: process.env.ddbEndpoint
    });
  }

  return new DynamoDB.DocumentClient();
}