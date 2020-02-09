const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-southeast-2' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const tableNames = require('../../common/constants').TableNames;

exports.default = { 
  async up() {
    var stagesParams = {
      TableName: tableNames.stages,
      KeySchema: [
        { AttributeName: 'stageId', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'stageId', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    };

    await ddb.createTable(stagesParams).promise();
    console.log("Created stages table");
  },
  async down() {
    var stageParams = { TableName: tableNames.stages }

    await ddb.deleteTable(stageParams).promise();
    console.log("Deleted stages table");
  }
}