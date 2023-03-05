interface CONST_ENABLE  {
    [key:string] : any
}
//API 接口地址
const CONST:CONST_ENABLE = {
    PEM_API:{
        
    },
    PEM_API_NEW:{

    },
    SSOHome:{
        dev:'',
        test:''
    },
    PGHPermission:{
        dev:'',
        test:''
    }
}
export default  CONST;


export const AUTH_STORAGE_KEY = '_BMC_AUTH_DD_SSO_'
export const permissionDataSymbol = Symbol()
export const permissionPagesSymbol = Symbol()
export const historyRoutesSymbol = Symbol()
export const pushHistorySymbol = Symbol()
export const removeHistorySymbol = Symbol()
export const routerObjSymbol = Symbol()
export const navUseOuterDataSymbol = Symbol()
export const PermissionProjectCodeSymbol = Symbol()
export const routerObjString = '__PGH_PERMISSION_MENU_ROUTER_OBJECT__'
export const permissionMenuHistoryRoutesString = '__PGH_PERMISSION_MENU_HISTORY_ROUTES__' 
export const permissionMenuPushHistoryString = '__PGH_PERMISSION_MENU_PUSH_HISTORY__'
export const permissionMenuRemoveHistoryString = '__PGH_PERMISSION_MENU_REMOVE_HISTORY__'
export const permissionMenuModifyCurTabTitleString = '__PGH_PERMISSION_MENU_MODIFY_CUR_TAB_TITLE__'
export const PermissionMenuChildAppRouterGo = '__PGH_PERMISSION_MENU_ROUTER_GO__'
export const PermissionMenuIsInteGrateString = '__PGH_PERMISSION_MENU_IS_INTEGRATE__'
export const PEMChildAppRouterPush = '__PGH_PERMISSION_MENU_CHILDAPP_ROUTER_PUSH__'