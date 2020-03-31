import { Container } from 'inversify';
import { IFlowMetadataRepository } from '@domain/interfaces/repository';
import { FlowMetadataRepository } from './repositories';
import { TYPES as T } from '@domain/constants';

export class IocConfiguration {
    RegisterIoc(): Container {
        let container = new Container();

        this.RegisterRepositories(container);

        return container;
    }

    private RegisterRepositories(container: Container): void {
        container.bind<IFlowMetadataRepository>(T.IFlowMetadataRepository).to(FlowMetadataRepository);
    }
}