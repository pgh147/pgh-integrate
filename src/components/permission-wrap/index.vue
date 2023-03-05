<template>
  <slot></slot>
</template>
<script lang="ts">
import { provide, watch, reactive, onErrorCaptured, toRaw } from "vue";
import {
  getUrlSearch,
  getMulipleHash,
  getRoutePath,
} from "@/utils/util-common";
import { getNewPermissionMenu } from "@/common/permission-service";
import {
  permissionDataSymbol,
  permissionPagesSymbol,
  historyRoutesSymbol,
  pushHistorySymbol,
  removeHistorySymbol,
  routerObjSymbol,
  navUseOuterDataSymbol,
  routerObjString,
  permissionMenuHistoryRoutesString,
  permissionMenuPushHistoryString,
  permissionMenuRemoveHistoryString,
  PermissionMenuChildAppRouterGo,
  PermissionMenuIsInteGrateString,
  PermissionProjectCodeSymbol,
  PEMChildAppRouterPush,
} from "@/common/permission-const";
export default {
  name: "permission-wrap",
};
</script>
<script lang="ts" setup>
export interface Props {
  env?: string; // 环境变量
  projectCode?: string; // 权限中台 系统code
  pageLoad: boolean; // 页面是否已加载
  includeList?: string[]; // 需要保持keep-alive的页面
  outerData?: boolean; // 是否使用外部数据
  router: any; // 路由信息
  newPermission?: boolean; // 是否使用新权限系统
  integrateHome?: boolean; // 是否为集成页
}
const props = withDefaults(defineProps<Props>(), {
  env: "prd",
  newPermission: false,
  integrateHome: false,
});

const ROUTER_GO_EVENT_NAME = "onQiankunChildAppRouterGo";
const CHILDAPP_REMOVE_HISTORY_ENVENT_NAME = "onQiankunChildAppRemoveHistory";
const CHILDAPP_ROUTER_PUSH = "onQiankunChildAppRouterPush";
// 是否子应用
const isChildApp = !!(window as any).__POWERED_BY_QIANKUN__;
const isIntegrateHome = !!props.integrateHome;

const routePath: string = getRoutePath();

// 组件是否加载
let hasLoaded: boolean = false;
// 路由信息
const routePathInfo = reactive({
  path: "/",
  query: {},
});

if (!props.outerData && !props.projectCode) {
  console.error("缺少必要参数 projectCode");
}
if (!props.outerData && !props.env) {
  console.error("缺少必要参数 env");
}

const router: any = reactive({ router: {} });
const permissionData: any = reactive([]);
const permissionPageList: any = reactive([]);
const historyRoute: any = reactive([]);
provide(PermissionProjectCodeSymbol, props.projectCode || "");
provide(PermissionMenuIsInteGrateString, !!props.integrateHome);
provide(permissionDataSymbol, permissionData);
provide(permissionPagesSymbol, permissionPageList);
provide(historyRoutesSymbol, historyRoute);
provide(permissionMenuHistoryRoutesString, historyRoute);
provide(navUseOuterDataSymbol, !!props.outerData);

// 将router传递到子组件；不用额外props
router.router = props.router;
provide(routerObjSymbol, router.router);
provide(routerObjString, router.router);

// 新增记录
interface PushHistoryOption {
  jump?: boolean;
  path: string;
  title: string;
  projectCode?: string;
  isActive?: boolean;
  query?: {
    [key: string]: string | number;
  };
}
const pushHistory = (option: PushHistoryOption) => {
  option.path.indexOf("/") === 0 &&
    (option.path = option.path.replace("/", ""));
  const { path = "", jump = false } = option;
  const tempArr = historyRoute.filter((item: any) => {
    return item.path == path;
  });
  // 列表中有该路径
  if (tempArr.length) {
    historyRoute.forEach((item: any) => {
      item.isActive = false;
      item.path === path && (item.isActive = true);
    });
  } else {
    option.isActive = true;
    historyRoute.forEach((item: any) => {
      item.isActive = false;
    });
    historyRoute.push(option);
  }
  jump &&
    router.router.push({
      path: `/${path}`,
      query: option.query || {},
    });
};
provide(pushHistorySymbol, pushHistory);
provide(permissionMenuPushHistoryString, pushHistory);

// 删除记录
const removeHistory = (path: string) => {
  if (!path) {
    console.log("======removeHistory: path值为", path);
    return;
  }

  if (isChildApp) {
    childAppRemoveHistory({
      path,
      projectCode: props.projectCode as string,
    });
    return;
  }

  const tempPath = path.indexOf("/") === 0 ? path.replace("/", "") : path;
  const fIndex = historyRoute.findIndex((el: any) => el.path === tempPath);
  const isLastItem = historyRoute.length - 1 === fIndex;

  if (fIndex > -1) {
    historyRoute.splice(fIndex, 1);
  }
  if (!historyRoute.length) {
    router.router.push("/");
    return;
  }
  const activeIndex = historyRoute.findIndex((el: any) => el.isActive);
  if (activeIndex === -1) {
    const nextIndex = isLastItem ? historyRoute.length - 1 : fIndex;
    historyRoute[nextIndex].isActive = true;
    // 集成页
    if (isIntegrateHome) {
      const nextItem = toRaw(historyRoute[nextIndex]);
      delete nextItem.isActive;
      const { query, title, isActive } = nextItem;
      const pathProjectCode = getMulipleHash(`#/${nextItem.path}`, 0);
      const hashProjectCode = getMulipleHash(location.href, 0);
      // 同一个子应用
      if (pathProjectCode === hashProjectCode) {
        childAppRouterPush({
          path: nextItem.path,
          projectCode: pathProjectCode,
          query,
          title,
        });
        return;
      }

      router.router.push({
        path: `/${nextItem.path}`,
        query,
        title,
        isActive,
      });
    } else {
      router.router.push({
        path: historyRoute[nextIndex].path,
      });
    }
  }
};
provide(removeHistorySymbol, removeHistory);
provide(permissionMenuRemoveHistoryString, removeHistory);

// 子应用路由跳转
const childAppRouterPush = (option: ChildAppRouterGo) => {
  const { path = "", projectCode, query = {}, title = "" } = option;
  const routerGoEvent = new CustomEvent(CHILDAPP_ROUTER_PUSH, {
    detail: {
      path,
      projectCode,
      title,
      query,
    },
  });
  window.dispatchEvent(routerGoEvent);
};
provide(PEMChildAppRouterPush, childAppRouterPush);

interface ChildAppRemoveHistoryOption {
  path: string;
  projectCode: string;
}
// 子应用删除当前选项卡
const childAppRemoveHistory = (option: ChildAppRemoveHistoryOption) => {
  const { path = "", projectCode = "" } = option;
  const childAppEvent = new CustomEvent(CHILDAPP_REMOVE_HISTORY_ENVENT_NAME, {
    detail: {
      path,
      projectCode,
    },
  });
  window.dispatchEvent(childAppEvent);
};

// 子应用路由跳转
interface ChildAppRouterGo {
  path: string;
  title?: string;
  projectCode: string;
  query?: {
    [key: string]: any;
  };
}
// 子应用路由跳转
const childAppRouterGo = (option: ChildAppRouterGo) => {
  const { path = "", projectCode, query = {}, title = "" } = option;
  const routerGoEvent = new CustomEvent(ROUTER_GO_EVENT_NAME, {
    detail: {
      path,
      projectCode,
      title,
      query,
    },
  });
  window.dispatchEvent(routerGoEvent);
};
provide(PermissionMenuChildAppRouterGo, childAppRouterGo);

router.router.beforeEach((to: any) => {
  // 如果是乾坤子应用
  if (isChildApp) {
    const { path, meta, query } = to;
    childAppRouterGo({
      projectCode: props.projectCode || "",
      path,
      title: meta.title,
      query,
    });
    return;
  }
  // 非子应用
  let { path } = to;
  if (to.path === "/") {
    historyRoute.map((item: any) => {
      item.isActive = false;
      return item;
    });
    return;
  }
  path = path.replace("/", "");
  const tempArr = historyRoute.filter((item: any) => item.path === path);
  // 列表中有该路径
  if (tempArr.length) {
    historyRoute.forEach((item: any) => {
      item.isActive = false;
      item.path === path && (item.isActive = true);
    });
  } else {
    //去路由中查找是否由该路径
    const tempRoutes = router.router
      .getRoutes()
      .filter((item: any) => item.path === path);
    if (!tempRoutes.length) {
      return;
    }

    const curRoutes: any = tempRoutes[0];
    // 自定义路由无预设name 则添加title
    !curRoutes.title &&
      (curRoutes.title = curRoutes.name || (curRoutes.meta.title as string));
    curRoutes.query = to.query;

    historyRoute.push(curRoutes);
    historyRoute.forEach((item: any, index: number) => {
      item.isActive = index === historyRoute.length - 1;
    });
  }

  routePathInfo.path = to.path;
  routePathInfo.query = getUrlSearch(location.href);
});

const stop = watch(
  props,
  async (propsData) => {
    debugger;
    if (
      propsData.pageLoad ||
      hasLoaded ||
      !!props.outerData ||
      (!props.outerData && !props.projectCode) ||
      (!props.outerData && !props.env)
    ) {
      return;
    }
    hasLoaded = true;
    try {
      const permissionRes: any = await getNewPermissionMenu(
        props.projectCode as string,
        propsData.env as string
      );
      permissionRes.menuList.forEach((item: any) => {
        permissionData.push(item);
        permissionPageList.push(item);
      });
      // loadPermissionRoutes(router.router, permissionList, props.includeList, props.projectCode as string, routePathInfo)
    } catch (e) {
      console.error(e);
    }
    stop();
  },
  { immediate: true, deep: true }
);

onErrorCaptured((err) => {
  console.log("权限组件错误", err);
  return false;
});

window.addEventListener(ROUTER_GO_EVENT_NAME, (event: any) => {
  const { path = "", projectCode = "", query = {}, title } = event.detail;
  if (path === "/") {
    return;
  }
  if (!title) {
    return;
  }
  const pathStr =
    path.indexOf("/") !== path.lastIndexOf("/") ? path : projectCode + path;
  if (!isChildApp && isIntegrateHome) {
    pushHistory({
      path: pathStr,
      query,
      title,
    });
  }
});

window.addEventListener(CHILDAPP_REMOVE_HISTORY_ENVENT_NAME, (event: any) => {
  const { path = "", projectCode = "" } = event.detail;
  if (!isChildApp && isIntegrateHome) {
    const pathStr =
      path.indexOf("/") !== path.lastIndexOf("/")
        ? path
        : path.indexOf("/") === 0
        ? `${projectCode}${path}`
        : `${projectCode}/${path}`;
    removeHistory(pathStr);
  }
});

window.addEventListener(CHILDAPP_ROUTER_PUSH, (event: any) => {
  const { path = "", query } = event.detail;
  if (props.projectCode === event.detail.projectCode) {
    router.router.push({
      path: path.substring(event.detail.projectCode.length),
      query,
    });
  }
});
</script>
<style scoped lang="less"></style>
