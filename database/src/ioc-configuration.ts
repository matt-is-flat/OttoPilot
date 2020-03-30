import { Container } from 'inversify';
import { IFlowMetadataRepository } from '@domain/interfaces/repository';
import { FlowMetadataRepository } from './repositories';

export class IocConfiguration {
    RegisterContainer(container: Container): void {
        this.RegisterRepositories(container);
    }

    private RegisterRepositories(container: Container): void {
        container.bind<IFlowMetadataRepository>(FlowMetadataRepository);
    }
}