import {createApp,App as AppType} from 'vue'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia'
import "element-plus/dist/index.css";

import App from '@/App.vue'
import router from "@/routers/index";


// TOTEST  去掉export看看
export let app:AppType
function initValue() {
    const pinia = createPinia()
    app = createApp(App)
    app.use(router).use(pinia).use(ElementPlus)
    app.mount('#mainapp')
}
initValue()