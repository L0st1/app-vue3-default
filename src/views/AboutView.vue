<template>
  <div class="about">
    <h1>MricoApp__Vue3</h1>
    <!-- <div>{{ Store }}</div> -->
    <div>{{ a }}</div>
    <!-- <button @click="set2">将C设置为2 </button> -->
  </div>
</template>
<script setup lang="ts"> 
import { inject, computed, getCurrentInstance, toRaw } from 'vue';
const internalInstance = getCurrentInstance()
const appData = internalInstance?.appContext.config.globalProperties.$store;
console.log('----------', appData)

const a = computed(() => {
  return appData.state.persistedData
})
// const Store: any = inject("parentVuex");
// console.log(Store)
// const set2 = () => {
//   Store.commit('change-count', 2);
// }



</script>
