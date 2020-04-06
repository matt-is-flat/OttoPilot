import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES as T } from './constants';
import { IFlowHandler } from './interfaces';
import { FlowHandler } from './handlers';

export class IocConfiguration {
    RegisterIoc(): Container {
        let container = new Container();
        
        this.RegisterHandlers(container);

        return container;
    }

    private RegisterHandlers(container: Container) {
        container.bind<IFlowHandler>(T.IFlowHandler).to(FlowHandler);
    }
}