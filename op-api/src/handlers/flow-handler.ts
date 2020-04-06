import { IValidator, IConverter } from '@domain/interfaces';
import { Flow } from '@domain/business-objects';
import { inject, injectable } from 'inversify';
import { TYPES as T } from '@domain/constants';
import { ResponseHelper } from '../helpers';
import { IFlowHandler } from '../interfaces';
import { JsonResponse } from '../business-objects';
import { IFlowLogic } from '@domain/interfaces/logic';
import { FlowFilters } from '@domain/business-objects/search-filters';

@injectable()
export default class FlowHandler implements IFlowHandler {
    //private flowRequestValidator: IValidator<Flow>;
    //private requestToFlowConverter: IConverter<any, Flow>;
    private flowLogic: IFlowLogic;

    constructor(
        //@inject(T["IValidator<Flow>"]) flowRequestValidator: IValidator<Flow>,
        //@inject(T["IConverter<any, Flow>"]) requestToFlowConverter: IConverter<any, Flow>,
        @inject(T.IFlowLogic) flowLogic: IFlowLogic,
    ) {
        console.log("In handler constructor")
        //this.flowRequestValidator = flowRequestValidator;
        //this.requestToFlowConverter = requestToFlowConverter;
        this.flowLogic = flowLogic;
    }

    async SaveFlow(body: any): Promise<JsonResponse> {
        //let validation = this.flowRequestValidator.Validate(body);

        //if (!validation.isValid) {
        //    return ResponseHelper.InvalidModel().WithValidationMessages(validation).AsJson();
       // }

        //let flow = this.requestToFlowConverter.Convert(body);
        //await this.flowLogic.Save(flow);

        return ResponseHelper.Success().AsJson();
    }

    async GetFlow(id: string): Promise<JsonResponse> {
        console.log("Getting")
        let flow = await this.flowLogic.GetById(id);
        return ResponseHelper.Success().WithItem(flow).AsJson();
    }

    async GetFlows(filters: FlowFilters): Promise<JsonResponse> {
        let flows = await this.flowLogic.Get(filters);
        return ResponseHelper.Success().WithList(flows).AsJson();
    }
}