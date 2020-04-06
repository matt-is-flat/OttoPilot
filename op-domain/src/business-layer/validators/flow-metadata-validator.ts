import { IValidator } from "../../interfaces";
import { FlowMetadata, ValidationResult } from "../../business-objects";

export default class FlowMetdataValidator implements IValidator<FlowMetadata> {
    public Validate(input: FlowMetadata): ValidationResult {
        let isValid = true;
        let validationErrors = new Array<string>();
        
        if (!(input.flowName?.trim().length > 0)) {
            isValid = false;
            validationErrors.push('Flow metadata must contain a name');
        }

        return {
            isValid: isValid,
            validationErrors: validationErrors
        };
    }
}