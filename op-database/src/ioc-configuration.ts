import { Container } from 'inversify';
import { IFlowMetadataRepository } from '@domain/interfaces/repository';
import { FlowMetadataRepository } from './repositories';

export class IocConfiguration {
    RegisterContainer(): Container {
        let container = new Container();

        this.RegisterRepositories(container);

        return container;
    }

    private RegisterRepositories(container: Container): void {
        container.bind<IFlowMetadataRepository>(FlowMetadataRepository);
    }
}