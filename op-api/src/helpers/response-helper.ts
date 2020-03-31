import { JsonResponse } from '../business-objects';
import { ValidationResult } from '@domain/business-objects';

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

    static InvalidModel(): ResponseHelper {
        return new ResponseHelper(400, {});
    }

    WithItem(item: any): ResponseHelper {
        this.data.item = item;
        return this;
    }

    WithList(items: any[]): ResponseHelper {
        this.data.items = items;
        return this;
    }

    WithValidationMessages(validationResult: ValidationResult) {
        this.data.message = `Invalid parameters provided: ${validationResult.validationErrors.join(', ')}`;
        return this;
    }

    WithMessage(message: string) {
        this.data.message = message;
        return this;
    }

    AsJson(): JsonResponse {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(this.data)
        };
    }
}