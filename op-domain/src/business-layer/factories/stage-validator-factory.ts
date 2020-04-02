import { IFactory, IValidator } from '../../interfaces';

export default class StageValidatorFactory implements IFactory<string, IValidator<any>> {
    private validatorResolver: (input: string) => IValidator<any>;

    constructor(validatorResolver: (input: string) => IValidator<any>) {
        this.validatorResolver = validatorResolver;
    }

    Create(input: string): IValidator<any> {
        return this.validatorResolver(input);
    }
}