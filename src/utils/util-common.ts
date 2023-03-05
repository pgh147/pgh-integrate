
export function isParamEmpty(value) {
    if (value === '') return true;
    if (typeof value === 'undefined') return true;
    if (value === null) return true;
    return false;
}

export function deleteKey(base, name) {
    if (typeof base !== 'undefined') {
        delete base[name];
    }
}

function isEmpty(value) {
    if (value === '') return true;
    if (typeof value === 'undefined') return true;
    if (value === null) return true;
    if (Number.isNaN(value)) return true;
    if (typeof value === 'object' && Object.keys(value).length < 1) return true;
    return false;
}

function safeDecodeUrl(value) {
    try {
        if (/(%[0-9A-F]{2}){2,}/.test(value)) {
            // utf8编码
            return decodeURIComponent(value);
        } else {
            // unicode编码
            return unescape(value);
        }
    } catch (e) {
        return unescape(value);
    }
}

/**
 * ### 分割url中的path
 * @param {string} p
 * @returns {Array}
 * @ignore
 * @example
 * splitPath('pathname/test')
 * // => ['pathname' 'test']
 */
function splitPath(p) {
    // Splits path into array
    const split = p.split('/');

    if (checkSlash(p)) {
        split.shift();
    }
    return split;

    function checkSlash(p) {
        // IE Check as IE does not process pre /
        const slashTest = p.match('^/');
        return slashTest != null;
    }
}

/**
 * ### 分割url中的query
 * @param {string} queryString
 * @returns {object}
 * @ignore
 * @example
 * _parseQuery('?search=test')
 * // => { seach: 'test' }
 */
function _parseQuery(queryString, { hash = false, lowerCase = false } = {}) {
    const params = {};
    if (queryString) {
        const qs = hash
            ? queryString.replace(/^#/, '')
            : queryString.replace(/^\?/, '');
        const queries = qs.split('&');
        for (let i = 0, l = queries.length; i < l; i++) {
            const [key, ...rest] = queries[i].split('='); // 取rest防止 query1=a=&query2=b这种情况
            if (lowerCase) {
                params[key.toLocaleLowerCase()] = safeDecodeUrl(rest.join('='));
            } else {
                params[key] = safeDecodeUrl(rest.join('='));
            }
        }
        return params;
    }
    return params;
}

export function getUrlSearch(url: string) {
    if (!url) {
        return {};
    }
    const startIndex = url.indexOf('?');
    const params = {};
    if (startIndex === -1) {
        return {};
    }
    const str = url.substring(startIndex + 1);
    const arr = str.split('&');
    arr.forEach((item: any) => {
        if (item.indexOf('#') > -1) {
            item = item.substring(0, item.indexOf('#'));
        }
        const tempItem = item.split('=');
        params[tempItem[0]] = tempItem[1];
    });
    return params;
}

/**
 * ### 解析url
 * @param {string} url url链接
 *
 * @returns {parseUrlReturn} 返回一个对象，属性如下
 *  {string} source - 源链接\
 *  {string} protocol - 协议\
 *  {string} slash - 斜杠\
 *  {string} host - 域名\
 *  {string} port - 端口\
 *  {string} path - 路径\
 *  {Array} pathsplit - 分割后的路径\
 *  {string} query - 原始查询参数\
 *  {object} queryObj - 用对象整理后的查询参数\
 *  {string} hash - hash值\
 *  如果url无法解析，则返回空对象\
 * @example
 *
 * parseUrl('https://www.test.com:3000/mytest/test/123?test=foo&test2=bar#hash1=test')
 * // =>
 * {
 *  query: 'test=foo&test2=bar',
 *  queryObj: {
 *      test: 'foo',
 *      test2: 'bar'
 *  },
 *  hash: 'hash1=test',
 *  hashObj: {
 *      hash1: 'test'
 *  },
 *  host: 'www.test.com',
 *  path: 'mytest/test/123',
 *  pathsplit: [
 *      'mytest',
 *      'test',
 *      '123'
 *  ],
 *  port: '3000',
 *  protocol: 'https',
 *  slash: '//',
 *  source: 'https://www.test.com:3000/mytest/test/123?test=foo&test2=bar#hash1=test'
 *  }
 *
 */
export function parseUrl(url: string) {
    if (isParamEmpty(url)) return {};
    if (typeof url === 'object') return {};
    if (typeof url === 'string') url = url.trim();

    const PARSE_URL =
        /^(?:([A-Za-z0-9-_.]+):(?=\/\/))?(\/{0,3})([0-9_.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    const uriSplit = url.match(PARSE_URL);

    if (uriSplit == null) return {};

    // const [source = '', protocol = '', slash = '', host = '', port = '', path = '', pathsplit = '', query = '', queryObj = {}, hash = '', hashObj = {}] = uriSplit;
    // return { source, protocol, slash, host, port, path, pathsplit, query, queryObj, hash, hashObj }

    return {
        source: uriSplit[0],
        protocol: isEmpty(uriSplit[1]) ? '' : uriSplit[1], // => 'http'
        slash: isEmpty(uriSplit[2]) ? '' : uriSplit[2], // => '//'
        host: isEmpty(uriSplit[3]) ? '' : uriSplit[3], // => 'example.com'
        port: isEmpty(uriSplit[4]) ? '' : uriSplit[4], // => '3000'
        path: isEmpty(uriSplit[5]) ? '' : `${uriSplit[5]}`, // => '/pathname/test'
        pathsplit: isEmpty(uriSplit[5]) ? [] : splitPath(uriSplit[5]), // => '['pathname' 'test']'
        query: isEmpty(uriSplit[6]) ? '' : uriSplit[6], // => 'search=test'
        queryObj: getUrlSearch(url), // {seach:'test'}
        _queryLowercaseObj: isEmpty(uriSplit[6])
            ? {}
            : _parseQuery(uriSplit[6], { hash: true, lowerCase: true }), // {seach:'test'}
        hash: isEmpty(uriSplit[7]) ? '' : uriSplit[7], // => 'hash'
        hashObj: isEmpty(uriSplit[7])
            ? {}
            : _parseQuery(uriSplit[7], { hash: true }), // => {hash: 'test'}
        _hashLowercaseObj: isEmpty(uriSplit[7])
            ? {}
            : _parseQuery(uriSplit[7], { hash: true, lowerCase: true }) // => {hash: 'test'}
    };
}

/**
 * 解码对象里的value
 */
export function decodeObjectValue(obj = {}) {
    const res = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value == 'object') {
                res[key] = decodeObjectValue(value);
            } else {
                res[key] = safeDecodeUrl(value);
            }
        }
    }

    return res;
}

export function stringify(value) {
    if (typeof value === 'object') return '';
    if (typeof value !== 'string') return value.toString();
    return value;
}

export function isParsedUrlEmpty(parsedUrl) {
    if (isEmpty(parsedUrl)) return true;
    if (isEmpty(parsedUrl.host)) return true;
    return false;
}

/**
 * ### 组合url
 * @param {parseUrlReturn} parsedUrl 由parseUrl生成的数据
 * @returns {string} 合并好的url
 * @ignore
 */
export function combineParsedURL(parsedUrl) {
    updateParsedUrl(parsedUrl);
    if (isParsedUrlEmpty(parsedUrl)) return '';
    let uri = '';
    uri += isEmpty(parsedUrl.protocol)
        ? ''
        : `${stringify(parsedUrl.protocol)}:`;
    uri += isEmpty(parsedUrl.slash) ? '//' : `${stringify(parsedUrl.slash)}`;
    uri += isEmpty(parsedUrl.host) ? '' : `${stringify(parsedUrl.host)}`;
    uri += isEmpty(parsedUrl.port) ? '' : `:${stringify(parsedUrl.port)}`;
    uri += isEmpty(parsedUrl.path) ? '' : `/${stringify(parsedUrl.path)}`;
    uri += isEmpty(parsedUrl.query) ? '' : `?${stringify(parsedUrl.query)}`;
    uri += isEmpty(parsedUrl.hash) ? '' : `#${stringify(parsedUrl.hash)}`;

    return uri;

    /**
     * 根据修改的部分，更新parsedUrl
     * @param {parseUrlReturn} parsedUrl 由parseUrl生成的数据
     * @ignore
     */
      function updateParsedUrl(parsedUrl) {
        if (isEmpty(parsedUrl)) return parsedUrl;
        // path
        if (isEmpty(parsedUrl.pathsplit)) {
            parsedUrl.path = '';
        } else {
            parsedUrl.path = parsedUrl.pathsplit
                .map((value: any) => stringify(value))
                .join('/');
        }

        // query
        if (isEmpty(parsedUrl.queryObj)) {
            parsedUrl.query = '';
        } else {
            parsedUrl.query = Object.entries(parsedUrl.queryObj).reduce(
                (prev, [key, value], index) => {
                    if (index !== 0) prev += '&';
                    prev += `${key}=${
                        isEmpty(value)
                            ? ''
                            : encodeURIComponent(stringify(value))
                    }`;
                    return prev;
                },
                ''
            );
        }

        // hash
        if (isEmpty(parsedUrl.hashObj)) {
            parsedUrl.hash = '';
        } else {
            parsedUrl.hash = Object.entries(parsedUrl.hashObj).reduce(
                (prev, [key, value], index) => {
                    if (index !== 0) prev += '&';
                    prev += `${key}${
                        isEmpty(value)
                            ? ''
                            : '=' + encodeURIComponent(stringify(value))
                    }`;
                    return prev;
                },
                ''
            );
        }
    }
}

export function getRoutePath () {
    let hash = location.hash
    if (!hash) {
        return '/'
    }
    if (hash.indexOf('?') !== -1) {
        hash = hash.substring(0, hash.indexOf('?'))
    }
    hash = hash.substring(hash.lastIndexOf('/') + 1)
    return hash
}



/**
 * ### 判断是否为url
 * @param url 连接
 * @returns boolean
 */
 export function isUrl (url = ''): boolean {
    if (!url) {
        return false
    }
    const Exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    return Exp.test(url)
}
/**
 * 获取url参数
 * @author lu.mc
 * @param name 键名
 * @param url 连接；不传则为当前页面的连接
 * @returns
 * @example
 * ```js
 *  import { getUrlParam } from '@base/url'
 *  const ename = getUrlParam('ename')
 * ```
 */
 export function getUrlParam(name: string, url = ''): string {
    if (!url) {
        url = window.location.href;
    }
    const startIndex = url.indexOf('?');
    const params = {};
    if (startIndex > -1) {
        const str = url.substring(startIndex + 1);
        const arr = str.split('&');
        for (let i = 0; i < arr.length; i++) {
            const kv = arr[i].split('=');
            if (kv[1].indexOf('#') > -1) {
                kv[1] = kv[1].substring(0, kv[1].indexOf('#'));
            }
            params[kv[0]] = kv[1];
        }
    }
    return params[name]
}

interface UrlSearchObject {
    [key: string]: string
}
/**
 * ### 给链接添加参数
 * @param {string} url url链接
 * @param {object} paramObj 参数键值对对象
 * @returns {string} 加上参数之后的链接
 * @example
 * ```js
 * addUrlParam('http://www.belle.com', { test: 123 })
 * // => 'http://www.belle.com?test=123'
 *
 * addUrlParam('http://www.belle.com?sss=123&test=123', { test: 456 })
 * // => 'http://www.belle.com?sss=123&test=456'
 * ```
 */
 export function addUrlParam(url: string, paramObj: object) {
    const parsedUrl = parseUrl(url);
    Object.assign(typeof parsedUrl.queryObj === 'object'? parsedUrl.queryObj : {}, decodeObjectValue(paramObj));

    return combineParsedURL(parsedUrl);
}

/**
 * ### 删除url上的某个或多个参数
 * @param {string|string[]} name 要移除的参数名或者参数名数组
 * @param {string} url url链接
 * @returns {string} 删除参数之后的链接
 * @example
 *```js
 * removeUrlParam('test', 'http://www.example.com?test=1')
 * // => 'http://www.example.com'
 * removeUrlParam(['test', 'test1], 'http://www.example.com?test=1&test1=1')
 * // => 'http://www.example.com'
 * ```
 */
 export function removeUrlParam(name: string | string[], url: string): string {
    let names: any = [];
    if (Array.isArray(name)) {
        names = name;
    } else {
        names = [name];
    }
    const parsedUrl = parseUrl(url);
    const _parsedUrl = names.reduce((pre, name) => {
        deleteKey(pre.queryObj, name);
        return pre;
    }, parsedUrl);
    return combineParsedURL(_parsedUrl);
}

export function getMulipleHash(url:string,location:number):string{
    if (!url) {
        return ''
    }
    let hash = ''
    if (isUrl(url)) {
        const tempUrl = new URL(url)
        hash = tempUrl.hash.replace('#','')
    } else {
        hash = url
    }
    const hashReg = /\/\w*/g
    const hashArr:string[] = []
    hash.replace(hashReg,(m:string):string =>{
        const tempStr = m.replace('/','')
        hashArr.push(tempStr)
        return tempStr
    })
    if (hashArr.length < location - 1) {
        return ''
    }
    return hashArr[location]
}