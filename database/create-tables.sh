aws dynamodb create-table --cli-input-json file://stages.json --endpoint-url http://localhost:8000 
aws dynamodb create-table --cli-input-json file://flows.json --endpoint-url http://localhost:8000 

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb