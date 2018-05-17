import { CFFeatureFlagTypes } from '../shared/components/cf-auth/cf-auth.types';

export enum CurrentUserPermissions {
  APPLICATION_CREATE = 'create.application',
  SPACE_DELETE = 'delete.space',
  SPACE_EDIT = 'edit.space',
  ORGANIZATION_CREATE = 'create.org',
  ORGANIZATION_DELETE = 'delete.org',
  ORGANIZATION_EDIT = 'edit.org',
  ENDPOINT_REGISTER = 'register.endpoint',
  PASSWORD_CHANGE = 'change-password'
}
export type PermissionConfigType = PermissionConfig[] | PermissionConfig | PermissionConfigLink;
export interface IPermissionConfigs {
  [permissionString: string]: PermissionConfigType;
}

export enum PermissionStrings {
  _GLOBAL_ = 'global',
  SPACE_MANAGER = 'isManager',
  SPACE_AUDITOR = 'isAuditor',
  SPACE_DEVELOPER = 'isDeveloper',
  ORG_MANAGER = 'isManager',
  ORG_AUDITOR = 'isAuditor',
  ORG_BILLING_MANAGER = 'isBillingManager',
  ORG_USER = 'isUser',
  STRATOS_ADMIN = 'isAdmin'
}

export enum ScopeStrings {
  CF_ADMIN_GROUP = 'cloud_controller.admin',
  CF_READ_ONLY_ADMIN_GROUP = 'cloud_controller.admin_read_only',
  CF_ADMIN_GLOBAL_AUDITOR_GROUP = 'cloud_controller.global_auditor',
  CF_WRITE_SCOPE = 'cloud_controller.write',
  CF_READ_SCOPE = 'cloud_controller.write',
  STRATOS_CHANGE_PASSWORD = 'password.write',
  STRATOS_ADMIN = 'stratos.admin',
  SCIM_READ = 'scim.read'
}

export enum PermissionTypes {
  SPACE = 'spaces',
  ORGANIZATION = 'organizations',
  ENDPOINT = 'endpoint',
  ENDPOINT_SCOPE = 'endpoint-scope',
  FEATURE_FLAG = 'feature-flag',
  STRATOS = 'internal',
  STRATOS_SCOPE = 'internal-scope'
}

export type PermissionValues = ScopeStrings | CFFeatureFlagTypes | PermissionStrings;
export class PermissionConfig {
  constructor(
    public type: PermissionTypes,
    public permission: PermissionValues = PermissionStrings._GLOBAL_
  ) { }
}
export class PermissionConfigLink {
  constructor(
    public link: CurrentUserPermissions
  ) { }
}

export const permissionConfigs: IPermissionConfigs = {
  [CurrentUserPermissions.APPLICATION_CREATE]: new PermissionConfig(PermissionTypes.SPACE, PermissionStrings.SPACE_DEVELOPER),
  [CurrentUserPermissions.SPACE_DELETE]: new PermissionConfig(PermissionTypes.ORGANIZATION, PermissionStrings.ORG_MANAGER),
  [CurrentUserPermissions.SPACE_EDIT]: [
    new PermissionConfig(PermissionTypes.ORGANIZATION, PermissionStrings.ORG_MANAGER),
    new PermissionConfig(PermissionTypes.SPACE, PermissionStrings.SPACE_MANAGER),
  ],
  [CurrentUserPermissions.ORGANIZATION_CREATE]: [
    new PermissionConfig(PermissionTypes.FEATURE_FLAG, CFFeatureFlagTypes.user_org_creation),
    new PermissionConfig(PermissionTypes.ORGANIZATION, PermissionStrings.ORG_MANAGER),
    new PermissionConfig(PermissionTypes.ORGANIZATION, PermissionStrings.ORG_AUDITOR),
    new PermissionConfig(PermissionTypes.ORGANIZATION, PermissionStrings.ORG_BILLING_MANAGER),
    new PermissionConfig(PermissionTypes.ORGANIZATION, PermissionStrings.ORG_USER),
    new PermissionConfig(PermissionTypes.SPACE, PermissionStrings.SPACE_MANAGER),
    new PermissionConfig(PermissionTypes.SPACE, PermissionStrings.SPACE_AUDITOR),
    new PermissionConfig(PermissionTypes.SPACE, PermissionStrings.SPACE_DEVELOPER)
  ],
  [CurrentUserPermissions.ORGANIZATION_DELETE]: new PermissionConfig(PermissionTypes.ENDPOINT_SCOPE, ScopeStrings.CF_ADMIN_GROUP),
  [CurrentUserPermissions.ORGANIZATION_EDIT]: new PermissionConfigLink(CurrentUserPermissions.ORGANIZATION_DELETE),
  [CurrentUserPermissions.ENDPOINT_REGISTER]: new PermissionConfig(PermissionTypes.STRATOS, PermissionStrings.STRATOS_ADMIN),
  [CurrentUserPermissions.PASSWORD_CHANGE]: new PermissionConfig(PermissionTypes.STRATOS_SCOPE, ScopeStrings.STRATOS_CHANGE_PASSWORD),
};