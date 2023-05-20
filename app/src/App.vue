<template>
  <div class="layout">
    <el-container style="width: 100%; height: 100%">
      <el-aside width="200px">
        <el-menu
          active-text-color="#07c160"
          ref="menuRef"
          :router="true"
          background-color="#2e2e2e"
          :default-active="route.path"
          class="layout-menu"
          text-color="#fff"
        >
          <el-menu-item index="/">
            <div class="menu-item">设备管理</div>
          </el-menu-item>
          <el-menu-item index="/check">
            <div class="menu-item">标签盘点</div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main default-scrollbar">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { ElMenu } from "element-plus";
import { useDeviceStore } from "./stores";
const route = useRoute();
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;

  .layout-menu {
    width: 200px;
    height: 100%;
  }

  .menu-item {
    width: 100%;
    text-align: center;
    font-size: 20px;
  }

  .main {
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
</style>
