
<template>
  <div class="card me-2 p-4">
    <ul
      class="nav nav-pills mb-3 d-flex align-items-center"
      id="pills-tab"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          :class="{ 'nav-link': true, active: activeTab === 'customerMaster' }"
          id="pills-customer-master-tab"
          type="button"
          role="tab"
          aria-controls="pills-customer-master"
          :aria-selected="activeTab === 'customerMaster'"
          @click="activeTab = 'customerMaster'"
        >
          Customer Master
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :class="{
            'nav-link': true,
            active: activeTab === 'targetEstimatedSale',
          }"
          id="pills-target-estimated-sale-tab"
          type="button"
          role="tab"
          aria-controls="pills-target-estimated-sale"
          :aria-selected="activeTab === 'targetEstimatedSale'"
          @click="activeTab = 'targetEstimatedSale'"
        >
          Target, Estimated Sale
        </button>
      </li>
      <li
        class="nav-item ms-2"
        role="presentation"
        v-if="activeTab != 'customerMaster'"
      >
        <a-date-picker
          v-model:value="value3"
          :disabled-date="disabledDate"
          @change="onChangeMonth"
          picker="month"
        >
        </a-date-picker>
      </li>
      <li class="nav-item ms-auto" role="presentation">
        <a-button type="primary" @click="OpenModalUpload()">Upload</a-button>
      </li>
    </ul>

    <a-flex :style="{ ...boxStyle }" justify="flex-end" align="center">
      latest upload
      <CalendarOutlined class="mx-2" />
      {{ activeTab == 'customerMaster' ? txtLatestUploadTab1 : txtLatestUploadTab2 }}
    </a-flex>

    <div class="tab-content" id="pills-tabContent">
      <div
        :class="{
          'tab-pane fade': true,
          'show active': activeTab === 'customerMaster',
        }"
        id="pills-customer-master"
        role="tabpanel"
        aria-labelledby="pills-customer-master-tab"
      >
        <global-table :dataTable="dataTableTab1" :column="columnsTableTab1" />
      </div>
      <div
        :class="{
          'tab-pane fade': true,
          'show active': activeTab === 'targetEstimatedSale',
        }"
        id="pills-target-estimated-sale"
        role="tabpanel"
        aria-labelledby="pills-target-estimated-sale-tab"
      >
        <global-table :dataTable="dataTableTab2" :column="columnsTableTab2" />
      </div>
    </div>
  </div>

  <global-modal
    :title="title"
    :isEditMode="statusEditMode"
    :modalVisible="statusModal"
    :modalCallback="submitModalCallback"
    :modalFormItem="
      activeTab == 'customerMaster' ? modalFormItem : modalFormItemTab2
    "
    :masterData="[]"
    :formData="formData"
    :errors="errors"
    :btnFooter="1"
    @update:modalVisible="handleModalVisibleVisibility"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { CalendarOutlined } from "@ant-design/icons-vue";
import GlobalTable from "./components/GlobalTable.vue";
import GlobalModal from "./components/GlobalModal.vue";
import {
  getCustomers,
  getSalesTargets,
  uploadCustomers,
  uploadSalesTargets,
  getLastUploadCustomers,
  getLastUploadSalesTargets,
} from "../services/reportapi/upload-api.service";
import dayjs from "dayjs";

const value3 = ref();
const activeTab = ref("customerMaster");
const boxStyle = {
  width: "100%",
};

let title = ref("Upload Document");
let txtLatestUploadTab1 = ref("");
let txtLatestUploadTab2 = ref("");
let statusModal = ref(false);
let statusEditMode = ref(false);

const columnsTableTab1 = [
  {
    title: "CustomerCode (PRIME-Oracle)",
    dataIndex: "customerCode",
    key: "customerCode",
    width: 150,
    align: "center",
  },
  {
    title: "Customer Group 1",
    dataIndex: "customerGroup1",
    key: "customerGroup1",
    width: 150,
    align: "center",
  },
  {
    title: "Customer Group 2",
    dataIndex: "customerGroup2",
    key: "customerGroup2",
    width: 150,
    align: "center",
  },
  {
    title: "Customer Group 3",
    dataIndex: "customerGroup3",
    key: "customerGroup3",
    width: 150,
    align: "center",
  },
  {
    title: "Customer Group 4",
    dataIndex: "customerGroup4",
    key: "customerGroup4",
    width: 150,
    align: "center",
  },
  {
    title: "Customer Group 5",
    dataIndex: "customerGroup5",
    key: "customerGroup5",
    width: 150,
    align: "center",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
    width: 200,
    align: "center",
  },
  {
    title: "Customer Group 6",
    dataIndex: "customerGroup6",
    key: "customerGroup6",
    width: 150,
    align: "center",
  },
];

let dataTableTab1 = ref([
  // {
  //   customerCode: "customerCode",
  //   customerGroup1: "customerGroup1",
  //   customerGroup2: "customerGroup2",
  //   customerGroup3: "customerGroup3",
  //   customerGroup4: "customerGroup4",
  //   customerGroup5: "customerGroup5",
  //   customerName: "Admin",
  //   customerGroup6: "customerGroup6",
  // },
  // {
  //   customerCode: "customerCode",
  //   customerGroup1: "customerGroup1",
  //   customerGroup2: "customerGroup2",
  //   customerGroup3: "customerGroup3",
  //   customerGroup4: "customerGroup4",
  //   customerGroup5: "customerGroup5",
  //   customerName: "Admin",
  //   customerGroup6: "customerGroup6",
  // },
]);

const columnsTableTab2 = [
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    width: 150,
    align: "center",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    width: 150,
  },
  {
    title: "Target",
    dataIndex: "target",
    key: "target",
    width: 150,
    align: "center",
  },
  {
    title: "Estimated Week 1",
    dataIndex: "estimatedWeek1",
    key: "estimatedWeek1",
    width: 100,
    align: "center",
  },
  {
    title: "Estimated Week 2",
    dataIndex: "estimatedWeek2",
    key: "estimatedWeek2",
    width: 100,
    align: "center",
  },
  {
    title: "Estimated Week 3",
    dataIndex: "estimatedWeek3",
    key: "estimatedWeek3",
    width: 100,
    align: "center",
  },
  {
    title: "Estimated Week 4",
    dataIndex: "estimatedWeek4",
    key: "estimatedWeek4",
    width: 100,
    align: "center",
  },
  {
    title: "Estimated Week 5",
    dataIndex: "estimatedWeek5",
    key: "estimatedWeek5",
    width: 100,
    align: "center",
  },
];

let dataTableTab2 = ref([
  // {
  //   brand: "brand",
  //   customer: "customer",
  //   estimatedWeek1: "estimatedWeek1",
  //   estimatedWeek2: "estimatedWeek2",
  //   estimatedWeek3: "estimatedWeek3",
  //   estimatedWeek4: "estimatedWeek4",
  //   estimatedWeek5: "estimatedWeek5",
  //   customerGroup6: "customerGroup6",
  // },
  // {
  //   brand: "brand",
  //   customer: "customer",
  //   estimatedWeek1: "estimatedWeek1",
  //   estimatedWeek2: "estimatedWeek2",
  //   estimatedWeek3: "estimatedWeek3",
  //   estimatedWeek4: "estimatedWeek4",
  //   estimatedWeek5: "estimatedWeek5",
  //   customerGroup6: "customerGroup6",
  // },
]);

const formData = reactive({
  date: "",
  files: [],
});

const errors = reactive({
  date: "",
  files: "",
});

const modalFormItem = reactive([
  {
    label: "",
    value: "files",
    placeholder: "Drag and Drop Files here or",
    type: "uploadDragger",
    picker: "month",
    class: "text-center",
    validate: true,
    required: true,
  },
]);

const modalFormItemTab2 = reactive([
  {
    label: "",
    value: "date",
    placeholder: "Select Month To Upload",
    type: "datePicker",
    picker: "month",
    class: "text-center",
    validate: true,
    required: true,
  },
  {
    label: "",
    value: "files",
    placeholder: "Drag and Drop Files here or",
    type: "uploadDragger",
    picker: "month",
    class: "text-center",
    validate: true,
    required: true,
  },
]);

const disabledDate = (current) => {
  const startDate = dayjs().subtract(1, "month").startOf("month");
  const endDate = dayjs().add(1, "month").endOf("month");

  return current && (current.isBefore(startDate) || current.isAfter(endDate));
};

const onChangeMonth = async (val) => {
  const date = dayjs(val);
  const month = date.month() + 1;
  const year = date.year();
  await fetchDataSalesTarget(month, year);
};

const submitModalCallback = async (data) => {
  // console.log("submitModalCallback", data);
  // console.log(data);
  const files = data.files[0];

  // console.log('files', files);
  if (activeTab.value == "customerMaster") {
    const res = await uploadCustomers(files.originFileObj);
    if (res) {
      statusModal.value = false;
    }
  } else {
    const date = dayjs(data.date);
    const month = date.month() + 1;
    const year = date.year();
    const res = await uploadSalesTargets(files.originFileObj, year, month);
    if (res) {
      statusModal.value = false;
    }
  }
};

const OpenModalUpload = () => {
  statusModal.value = true;
};

const handleModalVisibleVisibility = (visible) => {
  statusModal.value = visible;
};

const fetchDataLastUploadCustomer = async () => {
  try {
    const res = await getLastUploadCustomers();
    // console.log(res);
    const dateString = res.last_update;
    const formattedDate = dayjs(dateString).format("DD/MM/YYYY");
    txtLatestUploadTab1.value = formattedDate
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

const fetchDataLastUploadSalesTarget = async () => {
  try {
    const res = await getLastUploadSalesTargets();
    // console.log(res);
    const dateString = res.last_update;
    const formattedDate = dayjs(dateString).format("DD/MM/YYYY");
    txtLatestUploadTab2.value = formattedDate
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

const fetchDataCustomer = async () => {
  try {
    const res = await getCustomers();
    if (res == null) return 
    const mapData = res.customers.map((data) => {
      return {
        customerCode: data.customer_code,
        customerGroup1: data.udf1,
        customerGroup2: data.udf2,
        customerGroup3: data.udf3,
        customerGroup4: data.udf4,
        customerGroup5: data.udf5,
        customerName: data.customer_name,
        customerGroup6: data.udf6,
      };
    });
    dataTableTab1.value = mapData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

const fetchDataSalesTarget = async (month = null, year = null) => {
  try {
    // console.log("fetchDataSalesTarget");
    const date = {
      month: month ? month : dayjs().month() + 1,
      year: year ? year : dayjs().year(),
    };
    const res = await getSalesTargets(date);
    // console.log(res);
    if (res == null) return 

    const mapData = res.map((data) => {
      return {
        brand: data.brand,
        customer: data.customer,
        target: data.target_month,
        estimatedWeek1: data.estimate_w1,
        estimatedWeek2: data.estimate_w2,
        estimatedWeek3: data.estimate_w3,
        estimatedWeek4: data.estimate_w4,
        estimatedWeek5: data.estimate_w5,
      };
    });

    dataTableTab2.value = mapData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    dataTableTab2.value = [];
  }
};

onMounted(async () => {
  // console.log(props.column);
  await fetchDataLastUploadCustomer();
  await fetchDataLastUploadSalesTarget();
  await fetchDataCustomer();
  await fetchDataSalesTarget();
});
</script>


<style scoped>
.nav.nav-pills {
  background-color: white;
}

.nav.nav-pills .nav-link.active {
  color: white;
  background-color: #2379ac;
}

.nav.nav-pills .nav-link {
  color: gray;
}

::v-deep .ant-table-tbody > tr > td {
  background-color: white !important;
}

::v-deep .ant-table-bordered .ant-table-cell {
  border: none !important;
}

::v-deep .ant-table-thead > tr > th {
  background-color: white !important;
  border: none !important;
}

::v-deep .ant-table-tbody > tr:hover > td {
  background-color: #f5f5f5 !important;
}

::v-deep .ant-table-cell {
  border: none !important;
}
</style>