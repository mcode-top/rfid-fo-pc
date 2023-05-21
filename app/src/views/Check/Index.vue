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
      <el-table
        :data="tableData"
        row-key="value"
        size="small"
        style="width: 100%; height: 100%"
      >
        <el-table-column prop="value" label="标签值" width="200" />
        <el-table-column label="设备名称" width="150">
          <template #default="{ row }">
            {{ row.readDevice.deviceName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lastReadTime"
          sortable
          label="最后读取时间"
          width="150"
        />
        <el-table-column label="RSSI">
          <template #default="{ row }">
            {{ row.readDevice.RSSI }}
          </template>
        </el-table-column>
        <el-table-column prop="total" sortable label="读取次数" width="90" />
      </el-table>
    </div>
    <div class="check-control border-left">
      <div class="title">数据信息</div>
      <ElDescriptions :column="2">
        <ElDescriptionsItem label="标签数">
          <div class="description-item">{{ tableData.length }}</div>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="盘点耗时">
          <div class="description-item">{{ currentTime }}</div>
        </ElDescriptionsItem>
      </ElDescriptions>
      <div class="title">盘点</div>
      <ElForm
        label-position="top"
        :model="formData"
        ref="formRef"
        style="width: 100%"
        :rules="formRule"
      >
        <ElFormItem label="读取区域" prop="area">
          <ElSelect v-model="formData.area">
            <ElOption
              :value="RFlyI160SelectAreaEnum.EPC"
              label="EPC"
            ></ElOption>
            <ElOption
              :value="RFlyI160SelectAreaEnum.TID"
              label="TID"
            ></ElOption>
            <ElOption
              :value="RFlyI160SelectAreaEnum.USER"
              label="USER"
            ></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="匹配地址" prop="match">
          <ElInput v-model="formData.match"></ElInput>
        </ElFormItem>
      </ElForm>
      <div class="control-item">
        <ElButton
          type="primary"
          :disabled="isCheck"
          class="control-btn"
          @click="handleStartCheck"
          >开始盘点</ElButton
        >
      </div>
      <div class="control-item">
        <ElButton
          class="control-btn"
          :disabled="!isCheck"
          @click="handleStopCheck"
          >停止盘点</ElButton
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeviceStore } from "@/stores";
import { myIpcSend } from "@/utils/ipc";
import {
  CALL_DEVICE_MANAGE_METHOD_IPC,
  isHex,
  RFlyI160SelectAreaEnum,
  type DeviceInfo,
  type DeviceRFlyI160CheckData,
} from "@my/common";
import { computed, ref, watch } from "vue";
import dayjs from "dayjs";
import type { ElForm, FormItemRule } from "element-plus";
import type { Arrayable } from "element-plus/es/utils";
const deviceStore = useDeviceStore();
type TableData = {
  value: string;
  lastReadTime: string;
  total: number;
  readDevice: DeviceInfo & DeviceRFlyI160CheckData;
};
const tableData = ref<TableData[]>([]);
watch(
  () => deviceStore.currentData,
  (newVal) => {
    tableData.value = newVal.reduce<TableData[]>((prve, next) => {
      // 检查这个标签是否已经存在
      const find = prve.find((item) => item.value === next.value);
      const currentDevice = deviceStore.findDevice(next.deviceId!);
      if (!find) {
        prve.push({
          value: next.value,
          lastReadTime: dayjs(next.lastReadTime).format("YYYY-MM-DD HH:mm:ss"),
          total: next.readCount,
          readDevice: {
            ...currentDevice!,
            ...next,
          },
        });
      } else {
        find.total += next.readCount;
        if (next.RSSI > find.readDevice.RSSI) {
          find.readDevice = {
            ...currentDevice!,
            ...next,
          };
        }
      }
      return prve;
    }, []);
  },
  {
    immediate: true,
  }
);
const formData = ref({
  area: RFlyI160SelectAreaEnum.EPC,
  match: "",
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const formRule = {
  match: [
    {
      validator: (rule, value, callback) => {
        if (formData.value.area !== RFlyI160SelectAreaEnum.EPC && !value) {
          return callback("如果读取区域不为EPC则必须填写匹配地址");
        } else if (value && !isHex(value)) {
          return callback("匹配地址必须是hex值");
        } else if (value.length % 2 !== 0) {
          return callback("匹配地址必须为偶数位");
        }
        return callback();
      },
    },
  ],
} as Record<string, Arrayable<FormItemRule>>;
const startDate = ref(new Date().getTime());
const nowDate = ref(new Date().getTime());
let timer: any = 0;
const isCheck = ref(false);
async function handleStartCheck() {
  await formRef.value?.validate();
  console.log("开始盘点");
  await myIpcSend(
    CALL_DEVICE_MANAGE_METHOD_IPC,
    "callAllDeviceApi",
    "startCheck",
    formData.value.area,
    formData.value.match
  );
  isCheck.value = true;
  startDate.value = new Date().getTime();
  nowDate.value = new Date().getTime();
  timer = setInterval(() => {
    nowDate.value = new Date().getTime();
  }, 300);
}
function f(n: number) {
  return n >= 10 ? n : "0" + n;
}
const currentTime = computed(() => {
  const duration = dayjs.duration(nowDate.value - startDate.value);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return `${f(hours)}:${f(minutes)}:${f(seconds)}`;
});
async function handleStopCheck() {
  clearInterval(timer);
  nowDate.value = new Date().getTime();
  console.log("停止盘点");
  await myIpcSend(
    CALL_DEVICE_MANAGE_METHOD_IPC,
    "callAllDeviceApi",
    "stopCheck"
  );
  isCheck.value = false;
}
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
