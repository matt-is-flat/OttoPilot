import 'source-map-support/register';
import { CreateStage, GetStages, GetStage } from './controllers/stages-controller';
export const CreateStageHandler = async (event, _) => {
    let stage = JSON.parse(event.body).stage;
    await CreateStage(stage);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Created a thing'
        })
    };
};
export const GetStagesHandler = async (event, _) => {
    let id = (event.queryStringParameters || {}).id;
    let result;
    if (id && id.trim().length > 0) {
        result = await GetStage(id);
    }
    else {
        result = await GetStages();
    }
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
};
//# sourceMappingURL=handler.js.map