declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.vue' {
    import type { App, DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any> & {
      install(app: App): void
    }
    export default component
}

declare module '@';

declare var APP_CONFIG: any;
