import { IRequestAction } from '../../../../../store/src/types/request.types';
import { PaginatedAction } from '../../../../../store/src/types/pagination.types';
import { EntityActionDispatcherManager } from '../action-dispatcher/action-dispatcher';
import { Action } from '@ngrx/store';

export type BaseOrchestratedActionBuilderTypes = 'get' | 'delete' | 'update' | 'create' | 'getAll' | string;

// A function that returns a ICFAction
export type OrchestratedActionBuilder<
  T extends any[] = any[],
  Y extends IRequestAction | PaginatedAction = IRequestAction
  > = (...args: T) => Y;

// A list of functions that can be used get interface with the entity
export interface OrchestratedActionBuilders {
  get?(guid: string, endpointGuid: string, ...args: any[]): IRequestAction;
  remove?(guid: string, endpointGuid: string, ...args: any[]): IRequestAction;
  update?(guid: string, endpointGuid: string, ...args: any[]): IRequestAction;
  create?(endpointGuid: string, ...args: any[]): IRequestAction;
  getAll?(paginationKey: string, endpointGuid: string, ...args: any[]): PaginatedAction;
  [actionType: string]: OrchestratedActionBuilder;
}

export class OrchestratedActionBuildersClass implements OrchestratedActionBuilders {
  [actionType: string]: OrchestratedActionBuilder<any[], IRequestAction>;
}

export class ActionOrchestrator<T extends OrchestratedActionBuilders = OrchestratedActionBuilders> {
  public getEntityActionDispatcher(actionDispatcher: (action: Action) => void) {
    return new EntityActionDispatcherManager<T>(actionDispatcher, this);
  }

  public getActionBuilder<Y extends keyof T>(actionType: Y): T[Y] {
    return this.actionBuilders[actionType];
  }

  public hasActionBuilder(actionType: keyof T) {
    return !!this.actionBuilders[actionType];
  }

  constructor(public entityKey: string, private actionBuilders: T = {} as T) { }
}