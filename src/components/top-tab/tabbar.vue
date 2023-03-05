<template>
  <div class="pghui_toptab-tabbar">
    <el-tag class="pghui_toptab-tabbar-home" @click="gohome">
      <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.87793 5.19055V12H11.6942V5.19055"
          stroke="#505968"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 6.63496L7.28571 1C9.38975 2.85965 13.5714 6.63496 13.5714 6.63496"
          stroke="#505968"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </el-tag>
    <el-tag
      class="pghui_toptab-tabbar-prev"
      v-if="scrollBtnShow"
      @click="prevTap"
    >
      <el-icon size="10" color="#999"><DArrowLeft /></el-icon>
    </el-tag>
    <div
      class="pghui_toptab-tabbar-wrapper"
      id="tabwrapper"
      @mousedown.native="onMouseDown"
    >
      <div
        class="pghui_toptab-tabbar-scroll"
        :class="wrapperClass"
        id="tabscroll"
        :style="scrollStyle.style"
      >
        <el-tag
          v-for="(tag, index) in tags"
          :key="tag"
          class="pghui_toptab-tabbar-item"
          :class="[tag.isActive ? 'on' : '', 'tag-item-right-key-' + index]"
          closable
          :disable-transitions="false"
          @click="tagTap(tag)"
          @close="tagClose(tag)"
        >
          {{ tag.title }}
        </el-tag>
      </div>
    </div>
    <el-tag
      v-if="scrollBtnShow"
      class="pghui_toptab-tabbar-next"
      @click="nextTap"
    >
      <el-icon size="10" color="#999"><DArrowRight /></el-icon>
    </el-tag>
  </div>
  <div
    class="pghui_toptab-tabbar-right_key_menu"
    v-if="rightKeyMenuShow"
    :style="rightKeyMenuStyle.style"
  >
    <ul>
      <li
        class="pghui_toptab-tabbar-right_key_menu-item"
        v-for="(item, index) in rightKeyMenuList"
        :key="item"
        @click="onRightKeyMenuTap(item.type)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  reactive,
  watch,
  inject,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
import { Router } from "vue-router";
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import { getMulipleHash } from "@/utils/util-common";
import {
  permissionMenuHistoryRoutesString,
  routerObjString,
  permissionMenuPushHistoryString,
  permissionMenuRemoveHistoryString,
  PermissionMenuIsInteGrateString,
  PermissionMenuChildAppRouterGo,
  PEMChildAppRouterPush,
} from "@/common/permission-const";
export default {
  name: "TabBar",
};
</script>
<script lang="ts" setup>
let tags: any = reactive([]);

const router = inject(routerObjString) as Router;
const historyRoute: any = inject(permissionMenuHistoryRoutesString);
const removeHistory: any = inject(permissionMenuRemoveHistoryString);
const childAppRouterGo: any = inject(PermissionMenuChildAppRouterGo);
const isInteGrate: boolean = !!inject(PermissionMenuIsInteGrateString);
const pushHistory: any = inject(permissionMenuPushHistoryString);
const childAppRouterPush: any = inject(PEMChildAppRouterPush);

const scrollBtnShow = ref(false);
const scrollStyle = reactive({ style: {} }); // 滚动样式
const offset = ref(0); // 位移
const wrapperWidth = ref(0); // 容器宽度
const scrollWidth = ref(0); // 滚动体宽度
const wrapperClass = ref(""); // 容器类名

// 右键菜单
const rightKeyMenuStyle = reactive({ style: {} });
const rightKeyMenuShow = ref(false);
const rightKeyMenuData: any = {
  current: { title: "关闭选项卡", type: "current" },
  other: { title: "关闭其他选项卡", type: "other" },
  right: { title: "关闭右侧选项卡", type: "right" },
  left: { title: "关闭左侧选项卡", type: "left" },
  all: { title: "关闭所有选项卡", type: "all" },
};
const rightKeyMenuList: any = reactive([]);
let currentRightMenuIndex: number = 0;

onMounted(() => {
  wrapperWidth.value = (
    document.getElementById("tabwrapper") as any
  ).clientWidth;
  // 阻止右键菜单
  (document.getElementById("tabwrapper") as any).oncontextmenu = (e: any) =>
    e.preventDefault();

  // dom事件触发以隐藏菜单
  domEventLanuchHideMenu();
});

watch(
  () => historyRoute,
  (newHR) => {
    tags = newHR;
    // 每次更新则重新获取scroll宽度
    const timer = setTimeout(() => {
      scrollWidth.value = (
        document.getElementById("tabscroll") as any
      ).clientWidth;
      // 去掉前后按钮 第一次减
      scrollWidth.value > wrapperWidth.value &&
        !scrollBtnShow.value &&
        (wrapperWidth.value -= 64);
      scrollBtnShow.value = scrollWidth.value > wrapperWidth.value;
      wrapperClass.value = scrollBtnShow.value ? "no-padding" : "";
      clearTimeout(timer);
    }, 500);
  },
  { immediate: true, deep: true }
);

// 标签点击
const tagTap = (tag: any) => {
  const { title = "", query = {}, path = "", projectCode = "" } = tag;

  if (isInteGrate) {
    const pathProjectCode = getMulipleHash(`#/${path}`, 0);
    const hashProjectCode = getMulipleHash(location.href, 0);
    if (pathProjectCode === hashProjectCode) {
      childAppRouterPush({
        path,
        projectCode: pathProjectCode,
        title,
        query,
      });
      return;
    }
    pushHistory({
      jump: true,
      path,
      title,
      query,
      projectCode,
    });
    return;
  }
  router.push({
    path,
    query,
  });
};

const tagClose = (tag: any) => {
  removeHistory(tag.path);
};

const prevTap = () => {
  if (offset.value == 0) {
    return;
  }
  let offsetNum = 100;
  if (Math.abs(offset.value) < offsetNum) {
    offsetNum = Math.abs(offset.value);
  }
  offset.value += offsetNum;
  scrollStyle.style = {
    transform: `translate(${offset.value}px, 0)`,
  };
};

const nextTap = () => {
  if (scrollWidth.value - wrapperWidth.value + offset.value <= 0) {
    return;
  }
  let offsetNum = 100;
  if (scrollWidth.value - wrapperWidth.value + offset.value < offsetNum) {
    offsetNum = scrollWidth.value - wrapperWidth.value + offset.value;
  }
  offset.value -= offsetNum;
  scrollStyle.style = {
    transform: `translate(${offset.value}px, 0)`,
  };
};

// 解析右键菜单
const parseRightKeyMenu = () => {
  const tagLen = tags.length;
  const { current, other, right, left, all } = rightKeyMenuData;
  rightKeyMenuList.splice(0, rightKeyMenuList.length);
  // 只有一个 || 只有两个选项卡时 && 最后一个
  if (tagLen == 1 || (tagLen === 2 && currentRightMenuIndex == tagLen - 1)) {
    rightKeyMenuList.push(current, all);
    return;
  }
  // 第一个选项卡
  if (currentRightMenuIndex == 0) {
    rightKeyMenuList.push(other, right, all);
    return;
  }
  // 第二个选项卡(除首页)
  if (currentRightMenuIndex == 1) {
    rightKeyMenuList.push(current, other, right, all);
    return;
  }
  // 最后一个选项卡
  if (currentRightMenuIndex == tagLen - 1) {
    rightKeyMenuList.push(current, other, left, all);
    return;
  }
  rightKeyMenuList.push(current, other, right, left, all);
};

// 右键点击
const onMouseDown = (ev: any) => {
  const { button = 0, clientX = 0, clientY = 0 } = ev;
  const baseKey = "tag-item-right-key-";
  if (button !== 2) {
    return;
  }
  for (let i = 0; i < ev.path.length; i++) {
    const itemClassName = ev.path[i].className;
    if (
      itemClassName &&
      typeof itemClassName === "string" &&
      itemClassName.indexOf(baseKey) != -1
    ) {
      const tempArr = itemClassName.split(" ");
      tempArr.forEach((item: string) => {
        if (item.indexOf(baseKey) != -1) {
          currentRightMenuIndex = parseInt(item.replace(baseKey, ""));
        }
      });
      parseRightKeyMenu();

      const timer = setTimeout(() => {
        rightKeyMenuShow.value = !!rightKeyMenuList.length;
        rightKeyMenuStyle.style = {
          left: `${clientX - 180}px`,
          top: `${clientY}px`,
        };
        clearTimeout(timer);
      }, 300);
    }
  }
};

// 右键菜单点击
const onRightKeyMenuTap = (type: string) => {
  switch (type) {
    // 关闭当前
    case "current":
      tagClose(tags[currentRightMenuIndex]);
      break;
    // 关闭其他选项卡
    case "other": {
      const tempArr = tags.filter(
        (item: any, index: number) =>
          item.path !== "/" && index !== currentRightMenuIndex
      );
      tempArr.forEach((item: any) => {
        tagClose(item);
      });
      break;
    }
    // 关闭右侧
    case "right":
      tagClose(tags[currentRightMenuIndex + 1]);
      break;
    // 关闭左侧
    case "left":
      tagClose(tags[currentRightMenuIndex - 1]);
      break;
    // 关闭所有
    case "all": {
      const tempArr = tags.filter(
        (item: any, index: number) => item.path !== "/"
      );
      tempArr.forEach((item: any) => {
        tagClose(item);
      });
      break;
    }
  }
  rightKeyMenuShow.value = false;
};

const hideRightMenu = () => {
  rightKeyMenuShow.value = false;
};

// 返回首页
const gohome = () => {
  router.push("/");
};

// dom 事件触发隐藏菜单
const domEventLanuchHideMenu = () => {
  document.onclick = () => hideRightMenu();
  document.onmousedown = (ev: any) =>
    ev && ev.button && ev.button == 2 && hideRightMenu();
  document.onscroll = () => hideRightMenu();
  document.oninput = () => hideRightMenu();
};
</script>
<style scoped lang="scss">
@import "./tabbar.scss";
</style>
