import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import { QiankunMicroAppItem } from '../components/projects.interface'

export function registerQiankunApps (microApps: QiankunMicroAppItem[]): void {
    if (!microApps.length) {
        return
    }
    try {
        registerMicroApps(microApps)
        // start()
        start({
            singular: false,
            sandbox: {
                experimentalStyleIsolation: true
            }
        })
    } catch (err) {
        console.error('注册app失败', err)
    }
}
