<template>
  <div>
    <div class="card me-2 p-4 custom-card">
      <div class="d-flex align-items-center justify-content-center h-100">
        <div class="text-center">
          <a-button
            type="primary"
            @click="exportExcelCustomer"
            class="my-2"
            style="background-color: #1cc88a"
          >
            <upload-outlined style="font-size: 16px"></upload-outlined>
            Customer Master
          </a-button>
          <br />
          <a-button
            type="primary"
            @click="exportExcelSalesTarget"
            class="my-2"
            style="background-color: #1cc88a"
          >
            <upload-outlined style="font-size: 16px"></upload-outlined>
            Target, Estimated sale
          </a-button>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script setup>
import { UploadOutlined } from "@ant-design/icons-vue";
import {
  exportCustomer,
  exportSalesTarget,
} from "../services/reportapi/template-api.service";

const exportExcelCustomer = async () => {
  try {
    const response = await exportCustomer();

    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "customer_template.xlsx";
    link.click();
  } catch (error) {
    console.error("Error during file download:", error);
  }
};

const exportExcelSalesTarget = async () => {
  try {
    const response = await exportSalesTarget();

    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "salesTarget_template.xlsx";
    link.click();
  } catch (error) {
    console.error("Error during file download:", error);
  }
};
</script>

<style scoped>
.custom-card {
  height: 500px;
}
</style>