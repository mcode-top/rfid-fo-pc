<template>
  <div class="title">录入设备</div>
  <ElForm label-position="top" ref="formRef" :model="formData" :rules="rules">
    <ElFormItem label="设备ID">
      <span style="font-size: 16px">{{
        formatMacToZh(formData.deviceId)
      }}</span>
    </ElFormItem>
    <ElFormItem label="自定义名称" prop="deviceName">
      <ElInput
        v-model="formData.deviceName"
        placeholder="请为设备定义名称"
      ></ElInput>
    </ElFormItem>
    <ElFormItem label="设备类型" prop="deviceType">
      <ElSelect v-model="formData.deviceType" placeholder="请输入设备类型">
        <ElOption :value="'RFlyI160'" label="RFlyI160"></ElOption>
      </ElSelect>
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
      @click="handleSubmit"
      :loading="submitLoading"
      >确认录入
    </ElButton>
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
  type FormItemRule,
} from "element-plus";
import { ref, toRaw } from "vue";
import { watch } from "vue";
import { clone } from "lodash";
import type { Arrayable } from "element-plus/es/utils";
import { useDeviceStore } from "@/stores/device";
import { formatMacToZh, vaildateIp, validatePort } from "@/utils";
import { myIpcSend } from "@/utils/ipc";

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
    await deviceStore.addDevice(toRaw(formData.value));
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false;
  }
}
// 监听当前控制台的信息,如果命中则更新表单
watch(
  deviceStore.currentControlInfo,
  () => {
    if (deviceStore.currentControlInfo.data) {
      formData.value = clone(deviceStore.currentControlInfo.data);
    }
  },
  {
    immediate: true,
  }
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
  margin-bottom: 20px;
}
</style>
