<template>
  <div class="about">
    <h1>MricoApp__Vue3</h1>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="vueuse A">{{ a }}</el-descriptions-item>
      <el-descriptions-item label="ice/stark-data B">{{ b }}</el-descriptions-item>
      <el-descriptions-item label="子应用定时器实时刷新 VueX C">{{ c }}</el-descriptions-item>
      <el-descriptions-item label="不挂载方法或属性到实例 C">{{ c2 }}</el-descriptions-item>
    </el-descriptions>
    <el-button @click="commitValueC">改变C的值为10</el-button>
    <el-button @click="sendEvent">触发@ice/stark-data事件</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { ElDescriptions, ElDescriptionsItem, ElButton } from "element-plus";
import { store as iceStore, event as iceEvent } from "@ice/stark-data";
import { useGlobalState } from "@/vueuse/store"; 

import { baseStore } from "@/main";

/* 子应用使用定时器实时刷新 : 缺点是数据刷新存在一定延迟 */
const instance = getCurrentInstance();
const store = instance && instance.proxy?.$store;

const c = ref(store.state.persistedData);
const c2 = ref(baseStore.state.persistedData);

const commitValueC = () => {
  store.commit("change-count", 10);
};

const { pause, resume, isActive } = useIntervalFn(() => {
  c.value = store.state.persistedData;
  c2.value = store.state.persistedData;
}, 500);

/* 子应用通过@ice/stark-data获取来自主应用或其他子应用的状态 */
const b = ref(iceStore.get("iceData"));
iceStore.on(
  "iceData",
  (data: unknown) => {
    b.value = data;
  },
  true
);
// 通过@ice/stark-data触发事件
const sendEvent = () => {
  iceEvent.emit("freshEvent", "value from child");
}

onUnmounted(() => {
  pause();
  iceStore.off("iceData");
});

const { getter, setter } = useGlobalState();
const a = getter("count");
</script>
