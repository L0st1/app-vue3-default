<template>
  <div class="custom-tree-container">
    {{ content }}
  </div>
  <el-button @click="alovaGet">点击发送一次请求</el-button>
</template>

<script lang="ts" setup>
import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const alovaInstance = createAlova({
  requestAdapter: GlobalFetch(),
});

const content = ref<string>("");
const alovaGet = () => {
  alovaInstance
  .Get("https://jsonplaceholder.typicode.com/todos/1")
  //@ts-expect-error
  .then((response) => response.text())
  .then((data) => {
    content.value = data;
    ElMessage.success("请求完成")
  });
}

</script>

<style></style>
