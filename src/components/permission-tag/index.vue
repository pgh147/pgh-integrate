<template>
  <slot :permission="hasPermission" v-if="isShow"></slot>
</template>
<script lang="ts">
import { watch, inject, ref } from "vue";
import {
  permissionPagesSymbol,
  PermissionProjectCodeSymbol,
} from "@/common/permission-const";
import { getRoutePath } from "@/utils/util-common";
export default {
  name: "permission-tag",
};
</script>
<script lang="ts" setup>
const props = defineProps({
  type: String,
  needHidden: Boolean,
});
const hidden = !!props.needHidden;
// props优先
const isShow = ref(hidden);
const routePath = getRoutePath();
const permissionTemp: any = inject(permissionPagesSymbol);
const permissionProjectCode: any = inject(PermissionProjectCodeSymbol);
const hasPermission = ref(false);

const parseMenu = (list: any) => {
  if (!list.length) {
    hasPermission.value = false;
    return;
  }
  const tempItem = list.filter(
    (item: any) => item.key === `${permissionProjectCode}/${routePath}`
  );
  if (!tempItem.length || !tempItem[0].action || !tempItem[0].action.length) {
    hasPermission.value = false;
    return;
  }
  const isAllow = !!tempItem[0].action.filter((item: any) => item == props.type)
    .length;
  hasPermission.value = isAllow;

  isShow.value = hidden ? true : isAllow;
};

watch(
  permissionTemp,
  (newPP) => {
    if (newPP && newPP.length) {
      parseMenu(newPP);
    }
  },
  { immediate: true, deep: true }
);
</script>
