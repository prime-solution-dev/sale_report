<template>
  <a-modal
    :title="title"
    :open="modalVisible"
    centered
    width="50%"
    @cancel="handleCancel"
    :maskClosable="false"
    :bodyStyle="{ borderTop: '2px solid #d9d9d9', padding: '20px' }"
  >
    <a-form :wrapper-col="{ span: 24 }" class="tw-w-full">
      <br />
      <a-row justify="start" class="tw-w-full" :gutter="[20, 0]">
        <template v-for="(item, rowIndex) in modalFormItem" :key="rowIndex">
          <a-col
            v-if="!item.hide"
            :span="item.span ? item.span : 24"
            :class="['tw-flex', 'tw-justify-center', 'tw-w-full', item.class]"
          >
            <a-form-item
              :label="item.label"
              class="tw-font-medium tw-w-full"
              :validate-status="
                item.validate ? getValidateStatus(item.value) : ''
              "
              :help="item.validate ? getErrorMessage(item.value) : ''"
              :rules="{
                required: item.required,
              }"
            >
              <component
                v-if="item.type != 'uploadDragger' && item.type != 'table'"
                :is="getComponentType(item.type)"
                v-model:value="localFormData[item.value]"
                :placeholder="item.placeholder"
                :options="
                  item.type === 'select' || item.type === 'checkbox'
                    ? item.options
                    : undefined
                "
                :mode="item.mode === 'multiple' ? 'multiple' : undefined"
                :show-search="item.type === 'select'"
                :format="item.type === 'datePicker' ? dateFormat : undefined"
                :picker="item.type === 'datePicker' ? item.picker : undefined"
                :pattern="item.type === 'input' ? '[a-zA-Z0-9]*' : undefined"
                :style="{
                  width:
                    item.type === 'datePicker'
                      ? `${item.placeholder.length * 8 + 15}px`
                      : '',
                }"
                class="tw-w-full"
              ></component>

              <a-upload-dragger
                v-if="item.type === 'uploadDragger' && item.type != 'table'"
                v-model:fileList="localFormData[item.value]"
                name="file"
                :show-upload-list="true"
                :multiple="false"
                @change="handleChange"
                @drop="handleDrop"
                :before-upload="beforeUpload"
                :max-count="1"
                style="border-color: #0162e8"
              >
                <p class="ant-upload-drag-icon">
                  <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">{{ item.placeholder }}</p>
                <a-button class="btn-outline-primary">Browser File</a-button>
              </a-upload-dragger>

              <a-table
                v-if="item.type == 'table'"
                :columns="item.columnTable"
                :data-source="item.dataTable"
                :scroll="{
                  x: 'max-content',
                }"
                bordered
                :pagination="false"
                class="custom-table mt-2 white-header-table"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'permission'">
                    <a-checkbox
                      v-model:checked="record.permission"
                      @change="updatePermission(record)"
                    />
                  </template>
                </template>
              </a-table>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>

    <template #footer>
      <div class="d-flex justify-content-between" v-if="btnFooter == 1">
        <a-button @click="handleCancel">Cancel</a-button>
        <a-button
          type="primary"
          @click="handleSaveManualAdd"
          class="d-flex align-items-center"
        >
          <upload-outlined style="font-size: 16px"></upload-outlined>
          Upload</a-button
        >
      </div>

      <div class="d-flex justify-content-end" v-if="btnFooter == 2">
        <a-button
          type="primary"
          @click="handleSaveManualAdd"
          class="d-flex align-items-center"
        >
          {{ txtBtnSubmit ? txtBtnSubmit : "Submit" }}</a-button
        >
        <a-button @click="handleCancel">Cancel</a-button>
      </div>
    </template>
  </a-modal>
</template>
 
<script setup >
// import {
//   DeleteOutlined,
//   QuestionCircleOutlined,
//   CheckOutlined,
// } from "@ant-design/icons-vue";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons-vue";
import { defineEmits, ref, watch } from "vue";

import { onMounted } from "vue";
// import { message } from "ant-design-vue";
// const fileList = ref([]);

const props = defineProps({
  title: {
    required: false,
  },
  isEditMode: {
    required: false,
  },
  modalVisible: {
    required: false,
  },
  modalCallback: {
    required: true,
  },
  modalChange: {
    required: false,
  },
  modalData: {
    required: false,
  },
  testString: {
    required: false,
  },
  modalFormItem: {
    required: false,
  },
  formData: {
    required: true,
    type: Object,
  },
  errors: {
    required: true,
  },
  masterData: {
    required: false,
  },
  btnFooter: {
    required: false,
  },
  txtBtnSubmit: {
    required: false,
  },
});

const dateFormat = "MM/YYYY";
const localFormData = ref({ ...props.formData });

watch(
  () => props.formData,
  (newVal) => {
    localFormData.value = { ...newVal }; 
  },
  { deep: true } 
);

const handleChange = (info) => {
  console.log("File changed:", info);
  info.file.status = "done";
  //   const status = info.file.status;
  //   if (status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
};

const handleDrop = (e) => {
  console.log(e);
};

const beforeUpload = (file) => {
  console.log(file.type);
  //   const isExcel =
  //     file.type ===
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  //   if (!isExcel) {
  //     message.error("You can only upload Excel file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  return false;
};
const emit = defineEmits(["update:modalVisible"]);

const handleCancel = () => {
  emit("update:modalVisible", false);
};

const updatePermission = (record) => {
  console.log(record);
  //   const tableData = props.modalFormItem.find(
  //     (item) => item.value === "table"
  //   ).dataTable;
  //   localFormData.value.table = tableData
  //     .filter((row) => row.permission == true)
  //     .map((mapData) => mapData.id);
};

const handleSaveManualAdd = () => {
  console.log(localFormData.value);

  if (localFormData.value.table) {
    const tableData = props.modalFormItem.find(
      (item) => item.value === "table"
    ).dataTable;

    localFormData.value.table = tableData
      .filter((row) => row.permission == true)
      .map((mapData) => mapData.id);
  }

  const dataToSend = localFormData.value;
  if (props.modalCallback) {
    props.modalCallback(dataToSend);
  }
};

const getComponentType = (type) => {
  return type === "select"
    ? "a-select"
    : type === "datePicker"
    ? "a-date-picker"
    : type === "checkbox"
    ? "a-checkbox-group"
    : type === "radioGroup"
    ? "a-radio-group"
    : "a-input";
};

const getValidateStatus = (label) => {
  return props.errors[label] ? "error" : "";
};

const getErrorMessage = (label) => {
  return props.errors[label];
};

onMounted(() => {
  //   localFormData.value = { ...props.formData };
});
</script>
 
<style scoped>
:where(.css-dev-only-do-not-override-19iuou).ant-btn-primary:not(
    :disabled
  ):hover {
  opacity: 0.7;
}
</style>
 
 