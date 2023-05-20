<template>
  <div
    class="flex-middle full"
    v-if="deviceStore.connectedDeviceList.length === 0"
  >
    <ElResult icon="warning">
      <template #title> 没有设备连接 </template>
    </ElResult>
  </div>
  <div v-else class="check full">
    <div class="check-content">
      <el-table :data="tableData" style="width: 100%; height: 100%">
        <el-table-column prop="value" label="标签值" width="280" />
        <el-table-column prop="total" sortable label="读取次数" width="120" />
        <el-table-column prop="lastReadTime" sortable label="最后读取事件" />
      </el-table>
    </div>
    <div class="check-control border-left">
      <div class="title">数据信息</div>
      <ElDescriptions :column="2">
        <ElDescriptionsItem label="标签数">
          <div class="description-item">1</div>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="盘点耗时">
          <div class="description-item">00:12:00</div>
        </ElDescriptionsItem>
      </ElDescriptions>
      <div class="title">盘点</div>
      <div class="control-item">
        <ElButton type="primary" class="control-btn">开始盘点</ElButton>
      </div>
      <div class="control-item">
        <ElButton class="control-btn">停止盘点</ElButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeviceStore } from "@/stores";
import { ref } from "vue";
const deviceStore = useDeviceStore();
const tableData = ref([
  {
    value: "00000000000000000C47C66A",
    lastReadTime: "2018-12-03 14:12:00",
    total: 50,
    readDevice: [
      {
        deviceId: "ABC",
        deviceName: "左大门",
        RSSI: -50,
        count: 10,
      },
      {
        deviceId: "AVB",
        deviceName: "右大门",
        RSSI: -30,
        count: 40,
      },
    ],
  },
  {
    value: "A1CD0000000000000C47C000",
    lastReadTime: "2018-12-02 14:12:00",
    total: 30,
    readDevice: [
      {
        deviceId: "AQQ",
        deviceName: "中大门",
        RSSI: -40,
        count: 20,
      },
      {
        deviceId: "AVB",
        deviceName: "右大门",
        RSSI: -70,
        count: 10,
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.check {
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: nowrap;
}
.check-content {
  flex-grow: 1;
  min-width: 400px;
  height: 100%;
}
.check-control {
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  .control-btn {
    width: 275px;
  }
  .control-item {
    margin-bottom: 12px;
  }
  .description-item {
    width: 60px;
    display: inline-block;
    text-align: center;
  }
  .title {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    padding-bottom: 12px;
  }
}
</style>
