import { Container } from 'inversify';

import { IFlowMetadataLogic } from './interfaces/logic';
import { FlowMetadataLogic, FlowStageLogic } from './business-layer/logic';

export class IocConfiguration {
    RegisterIoc(container: Container): void {
        this.RegisterLogicClasses(container);
    }

    private RegisterLogicClasses(container: Container): void {
        container.bind<IFlowMetadataLogic>("").to(FlowMetadataLogic);
    }
}