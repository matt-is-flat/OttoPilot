import { JsonResponse } from '../business-objects';

export default class ResponseHelper {
    private statusCode: number;
    private data: any;

    constructor(statusCode: number, data: any) {
        this.statusCode = statusCode;
        this.data = data;
    }

    static Success(): ResponseHelper {
        return new ResponseHelper(200, {});
    }

    WithList(items: any[]): ResponseHelper {
        this.data = {
            items: items
        };

        return this;
    }

    AsJson(): JsonResponse {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(this.data)
        };
    }
}