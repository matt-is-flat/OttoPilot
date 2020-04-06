import { IValidator, IFactory } from '../../interfaces';
import { Flow, ValidationResult, FlowStage, FlowMetadata } from '../../business-objects';
import { TYPES as T } from '../../constants';
import { inject, injectable } from 'inversify';

@injectable()
export default class FlowValidator implements IValidator<Flow> {
    private flowMetadataValidator: IValidator<FlowMetadata>;
    private stageValidatorFactory: IFactory<string, IValidator<any>>;

    constructor(
        @inject(T["IValidator<FlowMetadata>"])
        @inject(T["IFactory<string, IValidator<FlowStage>>"]) stageValidatorFactory: IFactory<string, IValidator<any>>
    ) {
        this.stageValidatorFactory = stageValidatorFactory;
    }

    Validate(input: any): ValidationResult {
        let valid = true;
        let validationErrors = new Array<string>();

        let flow = input as Flow;

        if (!flow.metadata || !flow.stages) {
            valid = false;
            validationErrors.push('Flow must contain metadata and stages components');
        }

        if (!flow.metadata.flowName) {
            valid = false;
            validationErrors.push('Flow metadata must contain a flowName element');
        }

        for (let stage of flow.stages) {
            let stageValidator = this.stageValidatorFactory.Create(stage.stageCode);
            let stageValidationResult = stageValidator.Validate(stage);

            if (!stageValidationResult.isValid) {
                valid = false;
                validationErrors = validationErrors.concat(stageValidationResult.validationErrors);
            }
        }

        return {
            isValid: valid,
            validationErrors: validationErrors
        };
    }
}