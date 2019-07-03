import { CF_ENDPOINT_TYPE } from '../../cf-types';
import { cfInfoEntityType } from '../cf-entity-factory';
import { IRequestAction } from '../../../store/src/types/request.types';

export const GET_INFO = '[CF Endpoint] Get Info';

export class GetCFInfo implements IRequestAction {
  constructor(public cfGuid: string) { }
  type = GET_INFO;
  endpointType = CF_ENDPOINT_TYPE;
  entityType = cfInfoEntityType;
}