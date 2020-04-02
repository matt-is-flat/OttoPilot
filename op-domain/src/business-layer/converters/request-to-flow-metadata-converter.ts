import { IConverter } from '../../interfaces';
import { FlowMetadata } from '../../business-objects';
import { injectable } from 'inversify';

@injectable()
export default class RequestToFlowMetadataConverter implements IConverter<any, FlowMetadata> {
    Convert(input: any): FlowMetadata {
        return {
            flowId: input.flowId,
            flowName: input.flowName,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        };
    }
}