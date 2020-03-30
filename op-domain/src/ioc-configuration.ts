import { Container } from 'inversify';
import { IFlowMetadataLogic, IFlowStageLogic } from './interfaces/logic';
import { FlowMetadataLogic, FlowStageLogic } from './business-layer/logic';

export class IocConfiguration {
    RegisterIoc(): Container {
        let container = new Container();

        this.RegisterLogicClasses(container);

        return container;
    }

    private RegisterLogicClasses(container: Container): void {
        
        container.bind<IFlowMetadataLogic>("IFlowMetadataLogic").to(FlowMetadataLogic);
        container.bind<IFlowStageLogic>("IFlowStageLogic").to(FlowStageLogic);
    }
}