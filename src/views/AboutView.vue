<template>
  <div class="about">
    <h1>MricoApp__Vue3</h1>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="qiankun Action A">kooriookami</el-descriptions-item>
      <el-descriptions-item label="ice/stack-data B">{{ 5 }}</el-descriptions-item>
      <el-descriptions-item label="子应用定时器实时刷新 VueX C">{{ c }}</el-descriptions-item>
      <el-descriptions-item label="不挂载方法或属性到实例 C">{{ c2 }}</el-descriptions-item>
    </el-descriptions>
    <el-button @click="commitValueC">改变C的值为10</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { ElDescriptions, ElDescriptionsItem, ElButton } from 'element-plus';

import { baseStore } from "@/main";

/* 子应用使用定时器实时刷新 : 缺点是数据刷新存在一定延迟 */
const instance = getCurrentInstance();
const store = instance && instance.proxy?.$store;

const c = ref(store.state.persistedData);
const c2 = ref(baseStore.state.persistedData);

const commitValueC = () => {
  store.commit("change-count", 10);
}

const { pause, resume, isActive } = useIntervalFn(() => {
  c.value = store.state.persistedData;
  c2.value = store.state.persistedData;
}, 500)

onUnmounted(() => {
  pause();
})
</script>
