const NODE_ENV = process.env.NODE_ENV;
/**
 * appPath
 * 子应用在主应用中打开的页面路径
 * 建议使用应用名 
 **/
/* --------------------------------------------------------------- */
/**
 * APP_ENV
 * 当前运行环境
 * dev: 开发环境
 * test: 测试环境
 * pre: 预发环境
 * prd: 线上环境
 * 发布时必须使用release
 */

/* --------------------------------------------------------------- */

/**
 * APP_CLIENT_ID
 * clientId
 * 在paas中申请
 */

/* --------------------------------------------------------------- */

/**
 * APP_PROJECT_CODE
 * 权限菜单projectCode, 在paas中申请
 */
const config = {
    dev: {
        APP_ENV: 'dev',
        APP_API_HOST: '//pghui.test.com',
        APP_CLIENT_ID: 'hr-portal',
        APP_NEW_PEM_API_HOST: '//bdle.net.cn'
    },
    test: {
        APP_ENV: 'test',
        APP_API_HOST: '//phigh.cn',
        APP_CLIENT_ID: 'hr-portal',
        APP_NEW_PEM_API_HOST: 'https://new.net.cn'
    },
    pre: {
        APP_ENV: 'pre',
        APP_API_HOST: '//pghui.test.com',
        APP_CLIENT_ID: 'hr-portal',
        APP_NEW_PEM_API_HOST: 'https://pgh.newh.cn'
    },
    prod: {
        APP_ENV: 'prd',
        APP_API_HOST: '//pghui.test.com',
        APP_CLIENT_ID: 'hr-portal',
        APP_NEW_PEM_API_HOST: '//pgh.net.cn'
    }
}

module.exports = config[NODE_ENV];