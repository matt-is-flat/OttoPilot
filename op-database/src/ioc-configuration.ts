import { Container } from 'inversify';
import { IFlowMetadataRepository, IFlowStageRepository } from '@domain/interfaces/repository';
import { FlowMetadataRepository, FlowStageRepository } from './repositories';
import { TYPES as T } from '@domain/constants';
import 'reflect-metadata';

export class IocConfiguration {
    RegisterIoc(): Container {
        let container = new Container();

        this.RegisterRepositories(container);

        return container;
    }

    private RegisterRepositories(container: Container): void {
        container.bind<IFlowMetadataRepository>(T.IFlowMetadataRepository).to(FlowMetadataRepository);
        container.bind<IFlowStageRepository>(T.IFlowStageRepository).to(FlowStageRepository);
    }
}