
<template>
  <a-table
    :columns="column"
    :data-source="dataTable"
    :scroll="{
      x: 'max-content',
      y: 500,
    }"
    bordered
    :pagination="false"
    class="custom-table mt-2 white-header-table"
  >
    <!-- <template #headerCell="{ column }"> </template> -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tag'">
        <a-tag
          :style="{ marginRight: '10px', marginBottom: '10px' }"
          :color="'blue'"
        >
          {{ record[column.dataIndex].toUpperCase() }}
        </a-tag>
      </template>
      <template v-if="column.key === 'resetPassword'">
        <span style="font-size: 20px; color: gray"><KeyOutlined /> </span>
      </template>
      <template v-if="column.key === 'edit'">
        <span
          @click="handleEdit('Edit', record)"
          style="font-size: 20px; color: gray"
          ><EditOutlined />
        </span>
      </template>
      <template v-if="column.key === 'delete'">
        <span
          class="tw-rounded-lg"
          @click="showDeleteConfirm(record)"
          style="font-size: 20px; color: gray"
        >
          <DeleteOutlined />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  //   QuestionCircleOutlined,
} from "@ant-design/icons-vue";

import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode, onMounted } from "vue";
import { Modal } from "ant-design-vue";

const props = defineProps({
  dataTable: {
    // type: Array,
    required: true,
  },
  column: {
    // type: Array,
    required: true,
  },
  editCallback: {
    // type: Function,
    required: false,
  },
  deleteCallback: {
    // type: Function,
    required: false,
  },
  screenCode: {
    // type: String,
    required: false,
  },
  confirmDelete: {
    // type: Object,
    required: false,
  },
});

const handleEdit = async (txt, record) => {
  try {
    // console.log(txt, record);
    await props.editCallback(txt, record);
  } catch (err) {
    console.error(err);
  }
};

// const handleDelete = async (record) => {
//   try {
//     if (props.deleteCallback) {
//       await props.deleteCallback(record);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

const showDeleteConfirm = (record) => {
  console.log("showDeleteConfirm", props.confirmDelete);

  Modal.confirm({
    title: `${props.confirmDelete.title}`,
    icon: createVNode(ExclamationCircleOutlined),
    content: `${props.confirmDelete.content}`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    async onOk() {
      console.log("OK");
      if (props.deleteCallback) {
        await props.deleteCallback(record);
      }
    },
    onCancel() {
      console.log("Cancel");
    },
    centered: true,
  });
};

// const handleCancel = () => {
// console.log("Delete cancelled");
// };

onMounted(() => {
  // console.log(props.column);
});
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
}

/* ::v-deep .ant-table-cell {
  white-space: normal !important;
  word-break: break-word;
} */
</style>
