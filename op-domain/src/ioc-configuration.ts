import 'reflect-metadata';
import { TYPES as T } from './constants';
import { Container } from 'inversify';
import { IFlowMetadataLogic, IFlowStageLogic } from './interfaces/logic';
import { FlowMetadataLogic, FlowStageLogic } from './business-layer/logic';
import { IValidator, IConverter, IFactory } from './interfaces';
import { FlowValidator } from './business-layer/validators';
import { RequestToFlowConverter, RequestToFlowMetadataConverter, RequestToFlowStageConverter } from './business-layer/converters';
import { Flow, FlowMetadata, FlowStage } from './business-objects';
import StageValidatorFactory from 'business-layer/factories/stage-validator-factory';

export class IocConfiguration {
    RegisterIoc(): Container {
        let container = new Container();

        this.RegisterLogicClasses(container);
        this.RegisterValidators(container);
        this.RegisterConverters(container);
        this.RegisterFactories(container);

        return container;
    }

    private RegisterLogicClasses(container: Container): void {
        container.bind<IFlowMetadataLogic>(T.IFlowMetadataLogic).to(FlowMetadataLogic);
        container.bind<IFlowStageLogic>(T.IFlowStageLogic).to(FlowStageLogic);
    }

    private RegisterValidators(container: Container): void {
        container.bind<IValidator<any>>(T["IValidator<Flow>"]).to(FlowValidator)
    }

    private RegisterConverters(container: Container): void {
        container.bind<IConverter<any, Flow>>(T["IConverter<any, Flow>"]).to(RequestToFlowConverter);
        container.bind<IConverter<any, FlowMetadata>>(T["IConverter<any, FlowMetadata>"]).to(RequestToFlowMetadataConverter);
        container.bind<IConverter<any, FlowStage>>(T["IConverter<any, FlowStage>"]).to(RequestToFlowStageConverter);
    }

    private RegisterFactories(container: Container): void {
        let validatorResolver = (input: string) => container.getNamed<IValidator<any>>(T["IValidator<Stage>"], input);
        let stageValidatorFactory = new StageValidatorFactory(validatorResolver);
        container.bind<IFactory<string, IValidator<any>>>(T["IFactory<string, IValidator<any>>"]).toConstantValue(stageValidatorFactory);
    }
}