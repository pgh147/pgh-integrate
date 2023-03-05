export interface QiankunMicroAppItem {
    name: string
    entry: string
    activeRule: string
    appPath?: string
    container: string
    props?: {
        [key: string]: any
    }
}

export interface BaseProjectItem {
    name?: string
    entry?: string
    activeRule?: string
    appPath?: string
    bigIcon?: string
    homeUrl?: string
    projectName?: string
    projectNameEn?: string
    smallIcon?: string
    direct?: string | number
}

export interface BaseUnitItem {
    unitName: string
    list: BaseProjectItem[]
}
