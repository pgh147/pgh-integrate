import {
    createRouter,
    createWebHashHistory,
    Router
} from "vue-router";
const router: Router = createRouter({
history:createWebHashHistory(),
routes:[{path:'/',component:()=>import('../views/home.vue')}]
})

export default router