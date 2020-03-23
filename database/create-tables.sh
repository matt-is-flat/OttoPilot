aws dynamodb create-table --cli-input-json file://flow-metadata.json --endpoint-url http://localhost:8000 
aws dynamodb create-table --cli-input-json file://flow-stages.json --endpoint-url http://localhost:8000 

java -Djava.library.path=../dynamodb_local_latest/DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb