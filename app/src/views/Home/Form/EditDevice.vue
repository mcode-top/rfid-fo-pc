<template>
  <div class="title">配置设备</div>
  <ElForm label-position="top" ref="formRef" :model="formData" :rules="rules">
    <el-descriptions :column="2">
      <el-descriptions-item :span="2" label="设备ID">{{
        formatMacToZh(formData.deviceId)
      }}</el-descriptions-item>
      <el-descriptions-item label="设备状态">
        <DeviceStatus
          :status="deviceStore.currentControlInfo.data?.deviceStatus"
      /></el-descriptions-item>
      <el-descriptions-item label="设备类型">{{
        formData.deviceType
      }}</el-descriptions-item>
    </el-descriptions>
    <ElFormItem label="设备名称" prop="deviceName">
      <ElInput v-model="formData.deviceName" placeholder="设备名称"></ElInput>
    </ElFormItem>
    <ElFormItem label="设备IP">
      <ElInput v-model="formData.ip" placeholder="请修改设备IP"></ElInput>
    </ElFormItem>
    <ElFormItem label="设备端口" prop="port">
      <el-input-number
        v-model="formData.port"
        :min="1"
        :max="65535"
        placeholder="端口号"
      ></el-input-number>
    </ElFormItem>
    <ElFormItem label="网关" prop="getway">
      <ElInput v-model="formData.getway" placeholder="请修改设备网关"></ElInput>
    </ElFormItem>
    <ElFormItem label="子网掩码" prop="mask">
      <ElInput v-model="formData.mask" placeholder="请修改子网掩码"></ElInput>
    </ElFormItem>
  </ElForm>
  <div style="margin-top: 16px">
    <ElButton
      type="primary"
      class="btn-confirm"
      @click="handleConnect"
      :loading="submitLoading"
      >连接设备
    </ElButton>
  </div>
  <div>
    <ElButton
      type="danger"
      class="btn-confirm"
      @click="handleDisconnect"
      :loading="submitLoading"
      >断开设备
    </ElButton>
  </div>
  <div>
    <ElTooltip placement="left" content="需要设备断开连接才可配置">
      <ElButton
        type="primary"
        class="btn-confirm"
        @click="handleSubmit"
        :loading="submitLoading"
        >确认配置
      </ElButton>
    </ElTooltip>
  </div>
</template>
<script setup lang="ts">
import {
  DEVICE_SETTING_BASE_IPC,
  type DeviceInfo,
  type ScanDeviceRFlyI160UDPData,
} from "@my/common";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElMessage,
  type FormItemRule,
} from "element-plus";
import { ref } from "vue";
import { watch } from "vue";
import { clone } from "lodash";
import type { Arrayable } from "element-plus/es/utils";
import { useDeviceStore } from "@/stores/device";
import { formatMacToZh, vaildateIp, validatePort } from "@/utils";
import { myIpcSend } from "@/utils/ipc";
import DeviceStatus from "../components/DeviceStatus.vue";
import { DeivceStatusEnum } from "@my/common";
// 默认表单
const defaultFormData = {
  deviceName: "",
  deviceId: "",
  deviceType: "RFlyI160",
  ip: "",
  getway: "",
  mask: "",
  port: 20108,
};
const deviceStore = useDeviceStore();
const formData = ref<DeviceInfo>(defaultFormData);
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const submitLoading = ref(false);
/**@name 提交录入 */
async function handleSubmit() {
  if (
    !(
      deviceStore.currentControlInfo.data?.deviceStatus ===
        DeivceStatusEnum.Disconnected ||
      deviceStore.currentControlInfo.data?.deviceStatus ===
        DeivceStatusEnum.Unknown
    )
  ) {
    ElMessage.error("请先断开设备,再进行配置!");
    return;
  }
  submitLoading.value = true;
  try {
    await formRef?.value?.validate();
    await myIpcSend(DEVICE_SETTING_BASE_IPC, {
      mac: formData.value.deviceId,
      readerIp: formData.value.ip,
      readerPort: formData.value.port,
      readerGeteway: formData.value.getway,
      readerMask: formData.value.mask,
      mode: 1,
      targetIp: "0.0.0.0",
      targetPort: 20108,
    } as ScanDeviceRFlyI160UDPData);
    deviceStore.editDevice(formData.value);
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false;
  }
}
/**@name 连接设备 */
async function handleConnect() {
  submitLoading.value = true;

  try {
    await deviceStore.connectDevice(
      deviceStore.currentControlInfo.data!.deviceId
    );
  } catch (error: any) {
    console.error(error);
    ElMessage.error(error.message);
  } finally {
    submitLoading.value = false;
  }
}
/**@name 断开设备 */
async function handleDisconnect() {
  submitLoading.value = true;
  try {
    await deviceStore.disconnectDevice(
      deviceStore.currentControlInfo.data!.deviceId
    );
  } catch (error: any) {
    console.error(error);
    ElMessage.error(error.message);
  } finally {
    submitLoading.value = false;
  }
}
// 监听当前控制台的信息,如果命中则更新表单
watch(
  () => deviceStore.currentControlInfo.data,
  () => {
    if (deviceStore.currentControlInfo.data) {
      formData.value = clone(deviceStore.currentControlInfo.data);
    }
  },
  { immediate: true, deep: true }
);

// 表单规则
const rules = {
  deviceName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  deviceType: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  port: [
    { required: true, message: "设备端口不能为空", trigger: "blur" },
    validatePort,
  ],
  ip: [
    { required: true, message: "设备IP不能为空", trigger: "blur" },
    vaildateIp,
  ],
  getway: [
    { required: true, message: "设备网关不能为空", trigger: "blur" },
    vaildateIp,
  ],
  mask: [
    { required: true, message: "子网掩码不能为空", trigger: "blur" },
    vaildateIp,
  ],
} as Record<string, Arrayable<FormItemRule>>;
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.btn-confirm {
  width: 100%;
  height: 35px;
  margin-bottom: 8px;
}
</style>
