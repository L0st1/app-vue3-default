<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div
          style="
            height: 30px;
            width: 70%;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
          "
        >
          Fixed Top Block
        </div>
        <div ref="containerRef" style="height: 300px; overflow-y: auto">
          <div
            id="part1"
            style="height: 300px; background: rgba(255, 0, 0, 0.02); margin-top: 30px"
          >
            part1
          </div>
          <div
            id="part2"
            style="height: 300px; background: rgba(0, 255, 0, 0.02); margin-top: 30px"
          >
            part2
          </div>
          <div
            id="part3"
            style="height: 300px; background: rgba(0, 0, 255, 0.02); margin-top: 30px"
          >
            part3
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-anchor
          :container="containerRef"
          direction="vertical"
          :offset="30"
          @click="handleClick"
          @change="handleChange"
          type="default"
        >
          <el-anchor-link href="#part1" title="part1" />
          <el-anchor-link href="#part2" title="part2" />
          <el-anchor-link href="#part3" title="part3" />
        </el-anchor>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElAnchor, ElAnchorLink, ElRow, ElCol } from "element-plus";

const containerRef = ref<HTMLElement | null>(null);

const handleClick = (e: MouseEvent) => {
  // e.preventDefault();
};
const handleChange = (href: string) => {
  // console.log(`anchor change: ${href}`)
};

</script>
<style lang=scss scoped>
:deep(.el-anchor.el-anchor--vertical .el-anchor__marker) {
  background-color: red;
}
</style>
