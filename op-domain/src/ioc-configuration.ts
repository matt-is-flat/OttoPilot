import { Container } from 'inversify';
import { IFlowMetadataLogic, IFlowStageLogic } from './interfaces/logic';
import { FlowMetadataLogic, FlowStageLogic } from './business-layer/logic';
import { TYPES as T } from './constants';
import 'reflect-metadata';

export class IocConfiguration {
    RegisterIoc(): Container {
        let container = new Container();

        this.RegisterLogicClasses(container);

        return container;
    }

    private RegisterLogicClasses(container: Container): void {
        container.bind<IFlowMetadataLogic>(T.IFlowMetadataLogic).to(FlowMetadataLogic);
        container.bind<IFlowStageLogic>(T.IFlowStageLogic).to(FlowStageLogic);
    }
}