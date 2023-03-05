<template>
  <div
    class="belle_ui-permission_nav-wrapper"
    v-show="!isChildApp"
    :class="[isCollapse ? 'permissionMenuCollapse' : '', themeClass]"
    :style="{ background: menuBgColor, '--permission-theme': menuBgColor }"
  >
    <!-- 顶部标题栏 -->
    <div class="permission-menu-topbar" v-if="topbarShow">
      <div class="permission-menu-line"></div>
      <img class="permission-menu-logo" :src="appLogo" v-if="appLogo" />
      <div v-if="!isCollapse">{{ appTitle }}</div>
    </div>
    <el-scrollbar>
      <!-- 菜单 -->
      <el-menu
        ref="belleUiPermissionNav"
        :default-active="curIndex"
        class="belle_ui-permission_nav"
        :class="[isCollapse ? 'permissionMenuCollapse' : '', themeClass]"
        :collapse="isCollapse"
        active-text-color="#296DFF"
        :background-color="menuBgColor"
        :collapse-transition="collapseTransition"
        :default-openeds="defaultOpeneds"
        :unique-opened="props.uniqueOpened"
      >
        <template v-for="(item, index) in menus" :key="item.key">
          <!-- 只有一级菜单 -->
          <el-menu-item
            :class="themeClass"
            class="belle_ui-permission_nav-first"
            v-if="!item.children || !item.children.length"
            @click="menuItemTap(item.key, item.key, item.title)"
            :index="item.key"
          >
            <el-icon :size="12"
              ><component :is="item.icon || 'IconSort'"
            /></el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
          <!-- 多级菜单 -->
          <el-sub-menu
            :class="[themeClass]"
            class="belle_ui-permission_nav-sub"
            v-else
            :index="item.key"
            :popper-class="'permission-menu-sub-popper-' + themeClass"
          >
            <!-- 菜单标题 -->
            <template #title>
              <el-icon :size="12"
                ><component :is="item.icon || 'IconSort'"
              /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <!-- 菜单内容 -->
            <template v-if="item.children && item.children.length">
              <template v-for="(itm, idx) in item.children">
                <!-- 只有二级菜单内容 -->
                <el-menu-item
                  :class="themeClass"
                  class="belle_ui-permission_nav-sub-item"
                  v-if="!itm.children || !itm.children.length"
                  :index="itm.key"
                  @click="menuItemTap(itm.key, item.key, itm.title)"
                  >{{ itm.title }}</el-menu-item
                >
                <!-- 三级菜单 -->
                <el-sub-menu
                  :class="themeClass"
                  class="belle_ui-permission_nav-third"
                  v-else
                  :index="itm.key"
                >
                  <template #title
                    ><span>{{ itm.title }}</span></template
                  >
                  <el-menu-item
                    :class="themeClass"
                    v-for="(it, ix) in itm.children"
                    :index="it.key"
                    :parentkey="item.key"
                    @click="menuItemTap(it.key, item.key, it.title)"
                    >{{ it.title }}</el-menu-item
                  >
                </el-sub-menu>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
    <!-- 切换主题 -->
    <el-tooltip
      v-if="switchShow"
      :teleported="true"
      placement="top"
      :enterable="true"
      :append-to="'#' + appendTo"
      effect="light"
      :hide-after="150"
      :manual="true"
      :stop-popper-mouse-event="false"
      popper-class="permission-menu-switch-popper"
    >
      <template #content>
        <div
          v-for="(item, index) in themeColors"
          :key="item.title"
          class="switch-item"
          :class="[index == dropDownIndex ? 'on' : '']"
          @click="themeChange(index)"
        >
          <span
            class="switch-item-dot"
            :style="{ background: item.color }"
          ></span>
          <span class="switch-item-txt">{{ item.title }}主题</span>
          <el-icon :size="8" color="#296DFF"><Check /></el-icon>
        </div>
      </template>
      <el-button class="permission-menu-switch">
        <svg
          class="permission-menu-icon permission-menu-icon-cloth"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.95833 0.875C4.95833 2.00258 5.87242 2.91667 7 2.91667C8.12758 2.91667 9.04167 2.00258 9.04167 0.875H10.8977L13.125 4.21592L11.1761 5.88637V12.125H7H2.82387V5.88637L0.875 4.21592L3.10229 0.875H4.95833Z"
            stroke="#88909B"
            stroke-linejoin="round"
          />
        </svg>
      </el-button>
    </el-tooltip>
    <!-- 收起 -->
    <el-button class="permission-menu-fold" @click="foldTap">
      <svg
        v-if="!isCollapse"
        class="permission-menu-icon permission-menu-icon-fold"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.992506 12.5073C0.853126 12.5073 0.719454 12.4519 0.620898 12.3533C0.522341 12.2548 0.466972 12.1211 0.466972 11.9817C0.466972 11.8423 0.522341 11.7087 0.620898 11.6101C0.719454 11.5116 0.853126 11.4562 0.992506 11.4562H13.037C13.1763 11.4562 13.31 11.5116 13.4086 11.6101C13.5071 11.7087 13.5625 11.8423 13.5625 11.9817C13.5625 12.1211 13.5071 12.2548 13.4086 12.3533C13.31 12.4519 13.1763 12.5073 13.037 12.5073H0.992506ZM2.38279 8.40838L0.602472 6.65723C0.552074 6.6076 0.512213 6.5483 0.485279 6.48289C0.458345 6.41749 0.444893 6.34732 0.445728 6.27659C0.446562 6.20585 0.461667 6.13602 0.490137 6.07127C0.518607 6.00651 0.559856 5.94818 0.611412 5.89975L2.3748 4.23563C2.47631 4.14005 2.61163 4.08871 2.75099 4.0929C2.89036 4.09709 3.02235 4.15647 3.11793 4.25798C3.21351 4.35949 3.26485 4.49481 3.26066 4.63418C3.25647 4.77354 3.19709 4.90553 3.09558 5.00112L1.72788 6.28931L3.12052 7.65842C3.21885 7.75649 3.27441 7.88947 3.27508 8.02835C3.27574 8.16723 3.22146 8.30073 3.12407 8.39974C3.02667 8.49875 2.89408 8.55522 2.75521 8.55684C2.61634 8.55846 2.48247 8.50509 2.38279 8.40838ZM4.75734 6.98986C4.61796 6.98986 4.48429 6.93449 4.38573 6.83594C4.28718 6.73738 4.23181 6.60371 4.23181 6.46433C4.23181 6.32495 4.28718 6.19128 4.38573 6.09272C4.48429 5.99416 4.61796 5.9388 4.75734 5.9388H13.0059C13.1453 5.9388 13.279 5.99416 13.3775 6.09272C13.4761 6.19128 13.5314 6.32495 13.5314 6.46433C13.5314 6.60371 13.4761 6.73738 13.3775 6.83594C13.279 6.93449 13.1453 6.98986 13.0059 6.98986H4.75734ZM0.946398 2.3631C0.809804 2.35877 0.680268 2.30141 0.585262 2.20317C0.490257 2.10493 0.437256 1.97355 0.437501 1.83689C0.437746 1.70022 0.491217 1.56903 0.586574 1.47113C0.68193 1.37324 0.811672 1.31634 0.94828 1.3125H13.0351C13.1745 1.3125 13.3081 1.36787 13.4067 1.46643C13.5052 1.56498 13.5606 1.69865 13.5606 1.83803C13.5606 1.97741 13.5052 2.11109 13.4067 2.20964C13.3081 2.3082 13.1745 2.36357 13.0351 2.36357L0.946398 2.3631Z"
          fill="#88909B"
        />
      </svg>
      <svg
        v-else
        class="permission-menu-icon permission-menu-icon-fold"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0075 1.49274C13.1469 1.49274 13.2805 1.54811 13.3791 1.64666C13.4777 1.74522 13.533 1.87889 13.533 2.01827C13.533 2.15765 13.4777 2.29132 13.3791 2.38988C13.2805 2.48844 13.1469 2.54381 13.0075 2.54381L0.963035 2.5438C0.823654 2.5438 0.689982 2.48844 0.591426 2.38988C0.492869 2.29132 0.437501 2.15765 0.437501 2.01827C0.437501 1.87889 0.492869 1.74522 0.591426 1.64666C0.689982 1.54811 0.823654 1.49274 0.963035 1.49274L13.0075 1.49274ZM11.6172 5.59162L13.3975 7.34277C13.4479 7.3924 13.4878 7.4517 13.5147 7.51711C13.5417 7.58251 13.5551 7.65268 13.5543 7.72341C13.5534 7.79415 13.5383 7.86398 13.5099 7.92873C13.4814 7.99349 13.4401 8.05182 13.3886 8.10025L11.6252 9.76437C11.5237 9.85995 11.3884 9.91129 11.249 9.9071C11.1096 9.90291 10.9777 9.84353 10.8821 9.74202C10.7865 9.64051 10.7351 9.50519 10.7393 9.36582C10.7435 9.22646 10.8029 9.09447 10.9044 8.99888L12.2721 7.71069L10.8795 6.34157C10.7811 6.24351 10.7256 6.11053 10.7249 5.97165C10.7243 5.83277 10.7785 5.69927 10.8759 5.60026C10.9733 5.50125 11.1059 5.44478 11.2448 5.44316C11.3837 5.44154 11.5175 5.49491 11.6172 5.59162ZM9.24266 7.01014C9.38204 7.01014 9.51571 7.0655 9.61427 7.16406C9.71282 7.26262 9.76819 7.39629 9.76819 7.53567C9.76819 7.67505 9.71282 7.80872 9.61427 7.90728C9.51571 8.00584 9.38204 8.0612 9.24266 8.0612L0.994087 8.0612C0.854706 8.0612 0.721034 8.00583 0.622478 7.90728C0.52392 7.80872 0.468552 7.67505 0.468552 7.53567C0.468552 7.39629 0.523921 7.26262 0.622478 7.16406C0.721035 7.0655 0.854706 7.01014 0.994087 7.01014L9.24266 7.01014ZM13.0536 11.6369C13.1902 11.6412 13.3197 11.6986 13.4147 11.7968C13.5097 11.8951 13.5627 12.0265 13.5625 12.1631C13.5623 12.2998 13.5088 12.431 13.4134 12.5289C13.3181 12.6268 13.1883 12.6837 13.0517 12.6875L0.964915 12.6875C0.825536 12.6875 0.691864 12.6321 0.593307 12.5336C0.49475 12.435 0.439382 12.3013 0.439382 12.162C0.439382 12.0226 0.49475 11.8889 0.593307 11.7904C0.691864 11.6918 0.825536 11.6364 0.964915 11.6364L13.0536 11.6369Z"
          fill="#88909B"
        />
      </svg>
    </el-button>
  </div>
</template>
<script lang="ts">
import { reactive, watch, inject, ref, watchEffect, toRef, toRefs } from "vue";
import { Router } from "vue-router";
import { Menu, Check } from "@element-plus/icons-vue";
import {
  ChartColumn,
  IconUsers,
  IconAddUsers,
  IconSort,
  ChartLine,
  IconHorizontalArchitecture,
  IconMoney,
  IconPc,
  IconRead,
  IconSystem,
  IconDoctor,
  IconOrganization,
} from "@belement/icons-vue";
import {
  permissionDataSymbol,
  historyRoutesSymbol,
  navUseOuterDataSymbol,
  routerObjSymbol,
  PermissionMenuChildAppRouterGo,
  pushHistorySymbol,
  PermissionMenuIsInteGrateString,
  PEMChildAppRouterPush,
} from "@/common/permission-const";
import { getRoutePath } from "@/utils/util-common";
export default {
  name: "permission-nav",
  components: {
    ChartColumn,
    IconUsers,
    IconAddUsers,
    IconSort,
    ChartLine,
    IconHorizontalArchitecture,
    IconMoney,
    IconPc,
    IconRead,
    IconSystem,
    IconDoctor,
    IconOrganization,
  },
};
</script>
<script lang="ts" setup>
// 菜单原子组件
interface MenuAotomicItem {
  title: string;
  key: string;
  [key: string]: any;
}
// 子菜单项
interface SubMenuItem {
  title: string;
  key: string;
  children?: MenuAotomicItem[];
  [key: string]: any;
}
interface MenuItem {
  title: string;
  key: string;
  icon?: string;
  children?: SubMenuItem[];
  [key: string]: any;
}

interface Props {
  themeColor?: string; // 自定义主题颜色
  theme?: string; // 预设主题 默认light
  showTopbar?: boolean; // 是否展示头部栏
  title?: string; // 头部标题
  logo?: string; // 头部logo
  switchTheme?: boolean; // 是否切换主题
  menus?: MenuItem[]; // 外部菜单数据
  router?: boolean; // 是否作为路由模式
  onNavItemTap?: Function; // 点击事件
  appendTo?: string; // 弹出层所属位置默认app
  uniqueOpened?: boolean; // 是否只保持一个子菜单的展开
}

// 是否子应用
const isChildApp = !!(window as any).__POWERED_BY_QIANKUN__;

let navUseOuterData: boolean = !!inject(navUseOuterDataSymbol);
const isInteGrate: boolean = !!inject(PermissionMenuIsInteGrateString);
const permissionTemp: any = inject(permissionDataSymbol);
const historyRoute: any = inject(historyRoutesSymbol);
const router: any = inject(routerObjSymbol) as Router;
const childAppRouterGo: any = inject("__PGH_UI_PERMISSION_MENU_ROUTER_GO__");
const pushHistory: any = inject(pushHistorySymbol);
const childAppRouterPush: any = inject(PEMChildAppRouterPush);

const props = withDefaults(defineProps<Props>(), {
  title: "子应用",
  logo: "",
  showTopbar: false,
  switchTheme: true,
  appendTo: "app",
  uniqueOpened: false,
});
const propsRef = toRefs(props);

const collapseTransition = false;
const defaultThemeClass = ["light", "dark", "diy"];

const menus: any = reactive([]);
const curIndex = ref("");
const isCollapse = ref(false);
const menuBgColor = ref("#fff");
const themeClass = ref("light");
const appLogo = ref(propsRef.logo); // 顶部栏logo
const appTitle = ref(propsRef.title); // 顶部栏标题
const topbarShow = ref(propsRef.showTopbar); // 顶部栏展示
const dropDownIndex = ref(0); // 主题切换默认值
const switchShow = ref(true); // 主题切换
const themeColors = ref([
  { color: "#fff", name: "light", title: "简约白" },
  { color: "#181818", name: "dark", title: "静谧黑" },
]); // 主题颜色
let defaultOpeneds: any = reactive([]);
const belleUiPermissionNav: any = ref();
const appendTo = ref("app");

appendTo.value = propsRef.appendTo.value;
switchShow.value = propsRef.switchTheme.value;

// 以传入色值为准
if (props.themeColor) {
  menuBgColor.value = props.themeColor;
  themeClass.value = defaultThemeClass[2];
  themeColors.value.push({
    color: props.themeColor,
    name: "diy",
    title: "自定义",
  });
  dropDownIndex.value = 2;
}

// 设置主题
if (props.theme && props.theme === "dark") {
  menuBgColor.value = themeColors.value[1].color;
  themeClass.value = defaultThemeClass[1];
  dropDownIndex.value = 1;
}

// 解析菜单数据
const parseMenuData = (list: any) => {
  if (!list.length || menus.length) {
    return;
  }
  list.forEach((item: any) => {
    menus.push(item);
  });
};

// 菜单选项点击
const menuItemTap = (index: string, parentkey: string, title: string) => {
  curIndex.value = index;
  if (props.onNavItemTap) {
    props.onNavItemTap({
      key: index,
      parentkey,
    });
    return;
  }
  if (isInteGrate) {
    const pathProjectCode = index.substring(0, index.indexOf("/"));
    const hashProjectCode = location.hash.replace("#/", "");
    if (hashProjectCode.indexOf(pathProjectCode) === 0) {
      childAppRouterPush({
        path: index,
        projectCode: pathProjectCode,
      });
      return;
    }
  }
  router.push(`/${index}`);
};

// 菜单收起/展开
const foldTap = () => {
  // 菜单收起时 切换主题隐藏
  // switchShow.value = propsRef.switchTheme.value ? isCollapse.value : false
  isCollapse.value = !isCollapse.value;
};

// 主题切换
const themeChange = (val: number | string) => {
  const numberItem = Number(val);
  dropDownIndex.value = numberItem;
  menuBgColor.value = themeColors.value[numberItem].color;
  themeClass.value = defaultThemeClass[numberItem];
};

// 菜单展开回调
const onMenuOpen = (key: string | number) => {
  try {
    defaultOpeneds = [];
    const curMenuItem = menus.filter((item: any) => item.key === key)[0];
    if (
      !curMenuItem ||
      !curMenuItem.icon ||
      !curMenuItem.children ||
      !curMenuItem.children.length ||
      isCollapse.value
    ) {
      return;
    }
    curMenuItem.children.forEach((item: any) => {
      belleUiPermissionNav.value.open(item.key);
      defaultOpeneds.push(item.key);
    });
  } catch (err) {
    // 忽略菜单展开时错误
    // console.log('err', err)
  }
};

watchEffect(() => {
  if (props.menus && props.menus.length) {
    navUseOuterData = true;
    parseMenuData(props.menus);
  }
});

watchEffect(() => {
  if (!navUseOuterData && permissionTemp.length) {
    parseMenuData(permissionTemp);
  }
});

router.beforeEach((to: any) => {
  if (!navUseOuterData || props.router || isInteGrate) {
    curIndex.value = to.path.replace("/", "");
  }
});
</script>

<style scoped lang="scss">
@import "./index.scss";
@import "./menu.scss";
</style>
