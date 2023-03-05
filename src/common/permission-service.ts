import  request  from '@/utils/request'
import CONST, { AUTH_STORAGE_KEY } from './permission-const'
import {isUrl} from '@/utils/util-common'
const PGH_CODE = 'pghsystem'

import getMewPermissionMenuData from '@/api/getMewPermissionMenu'
import getNewPermissionSystemData from '@/api/sys-v2-list'

function doReq (option: any) {
    return new Promise((resolve, reject) => {
        if (!localStorage[AUTH_STORAGE_KEY] && !sessionStorage[AUTH_STORAGE_KEY]) {
            console.error('请先登录')
            reject('请先登录')
            return
        }

        request.get(option.url, option.param)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

        // request({
        //     ...option,
        //     method: 'get',
        //     successCode: 200
        // }).then(res => resolve(res)).catch(err => reject(err))
    })
}


function parseActionData (list: any) {
    if (!list || !list.length) {
        return []
    }
    const temp: any = []
    list.forEach((item: any) => {
        temp.push(item.status == 1 ? item.value : '')
    })
    return temp
}

interface IntegrateMenuItem {
    url?: string
    title: string
    key: string
    icon?: string
    children: any[]
}
// 新权限系统数据解析
function parseNewPermissionMenuData (list: any[], projectCode: string) {
    const tempList: any [] = []
    const qiankunChildren: any = []
    // 集成系统
    if (projectCode === PGH_CODE) {
        list.forEach((item: any, index) => {
            // 乾坤子应用
            if (isUrl(item.menuPath)) {
                qiankunChildren.push({
                    container: '#appone', // 微应用的容器节点
                    name: item.menuCode, // 子应用名称
                    entry: item.menuPath, // 子应用 entry 地址
                    activeRule: `/#/${item.menuCode}`, // 子应用激活规则
                    props: {
                        token: true
                    }
                })
            }
            // 系统菜单
            if (item.flag === 'Y' && item.hidden && item.hidden != 1) {
                const systemCode = item.menuCode
                tempList.push({
                    url: item.menuPath,
                    title: item.menuName,
                    key: item.menuPath ? item.menuPath : item.menuCode,
                    icon: item.icon,
                    children: item.childrenVos && item.childrenVos.length ? item.childrenVos.map((itm: any) => {
                        return {
                            key: itm.menuPath ? itm.menuPath : itm.menuCode,
                            title: itm.menuName,
                            children: itm.childrenVos && itm.childrenVos.length ? itm.childrenVos.map((it: any) => {
                                return it.hidden == 0 ? {
                                    key: it.menuPath ? it.menuPath : `${systemCode}/${it.menuCode}`,
                                    title: it.menuName
                                } : {}
                            }) : []
                        }
                    }) : []
                })
            }
        })
    } else {
        // 子系统
        list.forEach((item: any) => {
            // 有子菜单
            if (item.childrenVos && item.childrenVos.length) {
                const menuCode = item.menuCode
                item.childrenVos.forEach((itm: any) => {
                    (!itm.childrenVos || !itm.childrenVos.length) && itm.titleValueVoList && itm.titleValueVoList.length && tempList.push({
                        key: itm.menuCode,
                        action: parseActionData(itm.titleValueVoList)
                    })
                    itm.childrenVos && itm.childrenVos.length && itm.childrenVos.forEach((it: any) => {
                        tempList.push({
                            key: it.menuPath ? it.menuPath : `${menuCode}/${it.menuCode}`,
                            action: parseActionData(it.titleValueVoList)
                        })
                    })
                })
            // 无子菜单，单独连接
            } else {
                item.titleValueVoList && item.titleValueVoList.length && tempList.push({
                    key: item.menuCode,
                    action: parseActionData(item.titleValueVoList)
                })
            }
        })
    }
    return projectCode === PGH_CODE ? {
        menuList: tempList,
        qiankunChildren
    } : { menuList: tempList }
}

export function getNewPermissionMenu(projectCode: string, env = 'prd') {
    if (!env || env == 'release' || env == 'production') {
        env = 'prd'
    }
    return new Promise((resolve, reject) => {
        // const url: any = CONST.PEM_API_NEW[env]
        // if (!url) {
        //     reject('请检查环境参数')
        //     return
        // }
        // if (!localStorage[AUTH_STORAGE_KEY] && !sessionStorage[AUTH_STORAGE_KEY]) {
        //     reject('请先登录')
        //     return
        // }
        


        // request.get(
        //     url,
        //      {
        //         data: projectCode
        //     }
        // ).then((res: any) => {
        //     if(
        //         res.code != 200 ||
        //         !res.data ||
        //         !res.data.length
        //     ) {
        //         console.error('获取权限菜单错误, 请稍后重试')
        //         reject(res)
        //         return
        //     }
            const res = getMewPermissionMenuData
            resolve(parseNewPermissionMenuData(res.data, projectCode))
        // }).catch(err => {
        //     console.error('获取权限菜单错误, 请稍后重试')
        //     reject(err)
        // })
    })
}



export function getEmployProject () {
    return new Promise((resolve, reject) => {
        resolve([])
        // request({
        //     method: 'get',
        //     url: `${APP_CONFIG.APP_API_HOST}/pem-foreign/employ/projects`,
        //     needDDLogin: true,
        //     data: {
        //         projectGroupCode: '06'
        //     }
        // }).then((res: any) => {
        //     if (res?.length) {
        //         resolve(res)
        //     } else {
        //         reject(res)
        //     }
        // }).catch(err => {
        //     reject(err)
        // })
    })
}

export function getNewPermissionSystem () {
    return new Promise((resolve, reject) => {

const res = getNewPermissionSystemData;

                    if (res.data.list.length) {
                const temp: any = []
                res.data.list.forEach((item: any) => {
                    if (item.parentId && item.parentId === 'pghsystem' && item.systemUrl && item.flag && item.flag === 'Y') {
                        temp.push({
                            container: '#appcontainer', // 微应用的容器节点
                            name: item.systemCode, // 子应用名称
                            entry: item.systemUrl, // 子应用 entry 地址
                            activeRule: `/#/${item.systemCode}`, // 子应用激活规则
                            props: {
                                token: true
                            }
                        })
                    }
                })
                resolve(temp)
            } else {
                reject ([])
            }

        // resolve([{
        //                         container: '#appcontainer', // 微应用的容器节点
        //                         name: 'hr1', // 子应用名称
        //                         entry: 'https://office-data-imports-tool-test.belle.net.cn', // 子应用 entry 地址
        //                         activeRule: `/#/hr-report`, // 子应用激活规则
        //                         props: {
        //                             token: true
        //                         }
        //                     },{
        //                         container: '#appcontainer', // 微应用的容器节点
        //                         name: 'hr2', // 子应用名称
        //                         entry: 'https://office-data-imports-tool-test.belle.net.cn', // 子应用 entry 地址
        //                         activeRule: `/#/hr-report2`, // 子应用激活规则
        //                         props: {
        //                             token: true
        //                         }
        //                     }])
        // request({
        //     method: 'post',
        //     url: `${APP_CONFIG.APP_NEW_PEM_API_HOST}/portal/api/sys/v2/list`,
        // }).then((res: any) => {
        //     if (res.list.length) {
        //         const temp: any = []
        //         res.list.forEach((item: any) => {
        //             if (item.parentId && item.parentId === 'pghsystem' && item.systemUrl && item.flag && item.flag === 'Y') {
        //                 temp.push({
        //                     container: '#appcontainer', // 微应用的容器节点
        //                     name: item.systemCode, // 子应用名称
        //                     entry: item.systemUrl, // 子应用 entry 地址
        //                     activeRule: `/#/${item.systemCode}`, // 子应用激活规则
        //                     props: {
        //                         token: true
        //                     }
        //                 })
        //             }
        //         })
        //         resolve(temp)
        //     } else {
        //         reject ([])
        //     }
        // }).catch(err => reject(err))
    })
}

