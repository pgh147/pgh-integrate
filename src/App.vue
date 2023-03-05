<!--
<template>
  <div>首页</div>
</template>
<script lang="ts" setup></script>
-->

<template>
  <div class="portal-integrate">
    <permission-wrap
      :router="router"
      :pageLoad="pageLoad"
      outer-data
      integrate-home
    >
      <permission-nav
        :menus="menus"
        theme="light"
        show-topbar
        title="PGH"
        logo="http://retailr1.bellecdn.com/cas/resources/images/icon.png"
        append-to="mainapp"
        unique-opened
      />
      <div class="portal-integrate-container">
        <top-tab append-to="mainapp" :hr-sysmtems="hrSystems" />
        <div class="portal-integrate-fix">
          <template v-if="!isHomePage">
            <div id="appcontainer"></div>
          </template>
          <template v-else>
            <router-view />
          </template>
        </div>
      </div>
    </permission-wrap>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import PermissionWrap from "@/components/permission-wrap";
import PermissionNav from "@/components/permission-nav";
import TopTab from "@/components/top-tab";
import {
  getNewPermissionMenu,
  getNewPermissionSystem,
} from "@/common/permission-service";
import { registerQiankunApps } from "@/utils/registerMicroApp";
import CONST from "@/common/permission-const";
export default {
  name: "App",
};
</script>
<script lang="ts" setup>
const PGH_SYSTEM_CODE = "pghsystem";
const router = useRouter();
const env: any = APP_CONFIG.APP_ENV;
const pageLoad: any = ref(false);
const menus: any = reactive([]);
const isHomePage = ref(true);
const childAppContainers: any = reactive([]);

const hrSystems = [
  {
    title: "至ehr",
    url: CONST.SSOHome[env],
  },
  {
    title: "至权限管理平台",
    url: CONST.PGHPermission[env],
  },
];

const getNewPermissionMenuList = async (code: string, keyIndex: number) => {
  const res: any = await getNewPermissionMenu(code, env);
  const curMenuItem = menus[keyIndex];
  curMenuItem.children = res;
  menus.splice(keyIndex, 1, curMenuItem);
};

const onNavItemTap = async (ev: any) => {
  const { key, parentkey } = ev;
  const keyIndex = menus.findIndex((item: any) => {
    return item.key === key;
  });
  if (keyIndex > -1) {
    // await getPermissionMenuList(key, keyIndex)
    await getNewPermissionMenuList(key, keyIndex);
    return;
  }
};

const getNewPermissionSystemData = async () => {
  const sysRes: any = await getNewPermissionSystem();
  registerQiankunApps(sysRes);
};

const getNewPermissionSysList = async () => {
  const sysRes: any = await getNewPermissionMenu(PGH_SYSTEM_CODE, env);
  const { menuList } = sysRes;
  menuList?.forEach((item) => {
    menus.push(item);
  });
};

router.beforeEach((to) => {
  isHomePage.value = to.path === "/";
});

onMounted(async () => {
  try {
    // 登录  TODO
    // await login({
    //   clientId: APP_CONFIG.APP_CLIENT_ID,
    //   env: APP_CONFIG.APP_ENV,
    // });
    await getNewPermissionSystemData();
    getNewPermissionSysList();
  } catch (mountErr) {
    console.error("mount error", mountErr);
  }
});
</script>
<style lang="scss">
@import "@/styles/index.scss";
</style>
