import { APIGatewayProxyResult } from 'aws-lambda';
import { ValidationResult } from "../models/validation-result";

export function InvalidModelResponse(validationResult: ValidationResult): APIGatewayProxyResult {
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: `Invalid parameters provided: ${validationResult.validationErrors.join(', ')}`
    })
  };
}