
<template>
  <div class="card me-2 p-4">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Permissions">
        <div class="d-flex justify-content-between my-2">
          <h5>List Group</h5>
          <a-button
            type="primary"
            @click="OpenModalUpload('Add')"
            class="d-flex align-items-center"
            >Add Group <PlusOutlined
          /></a-button>
        </div>

        <global-table
          :dataTable="dataTableTab1"
          :column="columnsTableTab1"
          :editCallback="handleEditTab1"
          :confirmDelete="confirmDeleteTab1"
          :deleteCallback="handleDeleteTab1"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Users">
        <div class="d-flex justify-content-between my-2">
          <h5>List Users</h5>
          <a-button
            type="primary"
            @click="OpenModalUploadUsers('Add')"
            class="d-flex align-items-center"
            >Add Users <PlusOutlined
          /></a-button>
        </div>

        <global-table
          :dataTable="dataTableTab2"
          :column="columnsTableTab2"
          :editCallback="handleEditTab2"
          :confirmDelete="confirmDeleteTab2"
          :deleteCallback="handleDeleteTab2"
          :confirmResetPassword="confirmResetPasswordTab2"
          :resetPasswordCallback="handleResetPasswordTab2"
        />
      </a-tab-pane>
    </a-tabs>
  </div>

  <global-modal
    :title="title"
    :isEditMode="statusEditMode"
    :modalVisible="statusModal"
    :modalCallback="submitModalCallback"
    :modalFormItem="modalFormItem"
    :masterData="[]"
    :formData="formData"
    :errors="errors"
    :btnFooter="2"
    @update:modalVisible="handleModalVisibleVisibility"
  />

  <global-modal
    :title="titleUsers"
    :isEditMode="statusEditModeUsers"
    :modalVisible="statusModalUsers"
    :modalCallback="submitModalCallbackUsers"
    :modalFormItem="modalFormItemUsers"
    :masterData="[]"
    :formData="formDataUsers"
    :errors="errorsUsers"
    :btnFooter="2"
    :txtBtnSubmit=titleUsers
    @update:modalVisible="handleModalVisibleVisibilityUsers"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import GlobalTable from "./components/GlobalTable.vue";
import GlobalModal from "./components/GlobalModal.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  getPermission,
  getUser,
  getModuleItems,
  createPermissions,
  updatePermissions,
  deletePermissions,
  createUser,
  updateUser,
  deleteUser,
  resetPasswordUser
} from "../services/reportapi/user-api.service";

const activeKey = ref("1");

let confirmDeleteTab1 = ref({
  title: "Are you sure you want to delete this?",
  content:
    "Deleting this Permission will remove it permanently from the database.\n",
});

let confirmDeleteTab2 = ref({
  title: "Are you sure you want to delete this?",
  content: "Deleting this User will remove it permanently from the database.\n",
});

let confirmResetPasswordTab2 = ref({
  title: "Rest PassWord ?",
  content: "",
});

let title = ref("Group");
let titleUsers = ref("Users");
let statusModal = ref(false);
let statusEditMode = ref(false);
let statusModalUsers = ref(false);
let statusEditModeUsers = ref(false);

const columnsTableTab1 = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    width: "10%",
  },
  {
    title: "Group",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
  },
];

let dataTableTab1 = ref([
  // {
  //   index: 1,
  //   group: "Super Admin",
  // },
  // {
  //   index: 2,
  //   group: "User",
  // },
]);

const columnsTableTab2 = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    // align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Create Date",
    dataIndex: "createDate",
    key: "createDate",
    width: 150,
  },
  {
    title: "Group",
    dataIndex: "group",
    key: "tag",
    width: 150,
  },
  {
    title: "",
    dataIndex: "resetPassword",
    key: "resetPassword",
  },
  {
    title: "",
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
  },
];

let dataTableTab2 = ref([
  // {
  //   email: "david_wagner@example.com",
  //   name: "David Wagner",
  //   createDate: "24 Otc, 2015",
  //   group: "Super Admin",
  // },
  // {
  //   email: "windler.warren@runte.net",
  //   name: "Ina Hogan",
  //   createDate: "18 Dec, 2015",
  //   group: "Admin",
  // },
]);

const formData = reactive({
  userGroupID: "",
  userGroupCode: "",
  userGroupName: "",
  table: [],
});

const errors = reactive({
  month: "",
  files: "",
});

const formDataUsers = reactive({
  userID: "",
  email: "",
  name: "",
  userGroup: "",
});

const errorsUsers = reactive({
  month: "",
  files: "",
});

const modalFormItem = reactive([
  {
    label: "",
    value: "userGroupName",
    placeholder: "User Group Name *",
    type: "input",
    span: 6,
    validate: true,
    required: true,
  },
  {
    label: "",
    value: "table",
    placeholder: "",
    type: "table",
    columnTable: [
      {
        title: "Page",
        dataIndex: "page",
        key: "page",
        width: "20%",
      },
      {
        title: "Permission",
        dataIndex: "permission",
        key: "permission",
        width: "20%",
      },
    ],
    dataTable: [
      // {
      //   page: "DashBoard",
      //   permission: false,
      // },
      // {
      //   page: "Report",
      //   permission: false,
      // },
      // {
      //   page: "Upload",
      //   permission: false,
      // },
    ],
    class: "text-center",
    validate: true,
    required: true,
  },
]);

const modalFormItemUsers = reactive([
  {
    label: "Email ID *",
    value: "email",
    placeholder: "",
    type: "input",
    class: "text-center",
    span: 12,
    validate: true,
    required: true,
  },
  {
    label: "Name *",
    value: "name",
    placeholder: "",
    type: "input",
    class: "text-center",
    span: 12,
    validate: true,
    required: true,
  },
  {
    label: "",
    value: "userGroup",
    placeholder: "Select User Group",
    type: "select",
    options: [
      // { label: "Every Week", value: "week" }
    ],
    span: 12,
    validate: true,
    required: true,
  },
]);

const OpenModalUpload = (status) => {
  if (status == "Add") {
    formData.userGroupName = "";
    const updatedA = modalFormItem[1].dataTable.map((item) => {
      return {
        ...item,
        permission: false,
      };
    });

    modalFormItem[1].dataTable = updatedA;
  }

  title.value = `${status} Group`;
  statusModal.value = true;
};

const OpenModalUploadUsers = (status) => {
  // console.log(status);

  if (status == "Add") {
    formDataUsers.email = "";
    formDataUsers.name = "";
    formDataUsers.userGroup = "";
  } else {
    console.log('Edit');
    
  }

  titleUsers.value = `${status} User`;
  statusModalUsers.value = true;
};

const handleModalVisibleVisibility = (visible) => {
  statusModal.value = visible;
};

const handleModalVisibleVisibilityUsers = (visible) => {
  statusModalUsers.value = visible;
};

const handleEditTab1 = async (txt, record) => {
  try {
    console.log("handleEdit", record);
    formData.userGroupID = record.id;
    formData.userGroupName = record.name;
    const updatedA = modalFormItem[1].dataTable.map((item) => {
      const foundModule = record.modules.find(
        (module) => module.module_name === item.page
      );
      return {
        ...item,
        permission: foundModule ? true : false,
      };
    });

    modalFormItem[1].dataTable = updatedA;
    OpenModalUpload("Edit");
  } catch (err) {
    console.error(err);
  }
};

const handleEditTab2 = async (txt, record) => {
  try {
    // console.log("handleEdit", record);
    // console.log("handleEdit", modalFormItemUsers[2].options);
    const filterGroupID = modalFormItemUsers[2].options.filter((f) => {
      return f.label == record.group;
    });
    // console.log(filterGroupID);

    formDataUsers.userID = record.id;
    formDataUsers.email = record.email;
    formDataUsers.name = record.name;
    formDataUsers.userGroup = filterGroupID[0].value;
    OpenModalUploadUsers("Edit");
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteTab1 = async (record) => {
  try {
    console.log("handleDeleteTab1", record);
    const mapDataForDelete = {
      is_delete_group: true,
      permission_group_id: record.id,
    };
    const response = await deletePermissions(mapDataForDelete);
    if (response) {
      await fetchDataModuleItems();
      await fetchDataPermission();
    }
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteTab2 = async (record) => {
  try {
    // console.log("handleDeleteTab2", record);
    const mapDataForDelete = {
      user_id: record.id,
    };
    const response = await deleteUser(mapDataForDelete);
    if (response) {
      await fetchDataPermission();
      await fetchDataUser();
    }
  } catch (err) {
    console.error(err);
  }
};

const handleResetPasswordTab2 = async (record) => {
  try {
    console.log("handleResetPasswordTab2", record);
    const mapDataForResetPassword = {
      user: record.email,
    };
    const response = await resetPasswordUser(mapDataForResetPassword);
    if (response) {
      await fetchDataPermission();
      await fetchDataUser();
    }
  } catch (err) {
    console.error(err);
  }
};

const submitModalCallback = async (data) => {
  // console.log("submitModalCallback", data);
  if (title.value == "Add Group") {
    const mapDataForSave = {
      permission_group_code: data.userGroupName,
      permission_group_name: data.userGroupName,
      module_item_ids: data.table,
    };
    const res = await createPermissions(mapDataForSave);
    // console.log(res);
    if (res) {
      await fetchDataModuleItems();
      await fetchDataPermission();
      statusModal.value = false;
    }
  } else {
    const mapDataForSave = {
      permission_group_id: data.userGroupID,
      permission_group_name: data.userGroupName,
      module_item_ids: data.table,
    };
    // console.log(mapDataForSave);
    const res = await updatePermissions(mapDataForSave);
    // console.log(res);
    if (res) {
      await fetchDataModuleItems();
      await fetchDataPermission();
      statusModal.value = false;
    }
  }
};

const submitModalCallbackUsers = async (data) => {
  // console.log("submitModalCallbackUsers", data);
  if (titleUsers.value == "Add User") {
    const mapDataForSave = {
      user: data.email,
      password: "",
      email: data.email,
      permission_group_id: data.userGroup,
      name: data.name,
    };
    // console.log(mapDataForSave);
    const res = await createUser(mapDataForSave);
    // console.log(res);
    if (res) {
      await fetchDataPermission();
      await fetchDataUser();
      statusModalUsers.value = false;
    }
  } else {
    console.log('1', data.userGroup);
    console.log(modalFormItemUsers[2].options);
    
    const filterGroupID = modalFormItemUsers[2].options.filter((f) => {
      return f.value == data.userGroup;
    });
    console.log(filterGroupID);

    const mapDataForSave = {
      user_id: data.userID,
      email: data.email,
      user: data.email,
      name: data.name,
      permission_group_code: filterGroupID[0].label,
    };
    console.log(mapDataForSave);
    const res = await updateUser(mapDataForSave);
    // console.log(res);
    if (res) {
      await fetchDataPermission();
      await fetchDataUser();
      statusModalUsers.value = false;
    }
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

const fetchDataModuleItems = async () => {
  try {
    // console.log("fetchDataModuleItems");
    const res = await getModuleItems();
    // console.log(res);

    const mapData = res.map((data) => {
      return {
        id: data.id,
        page: data.module_name,
        permission: false,
      };
    });

    modalFormItem[1].dataTable = mapData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

const fetchDataPermission = async () => {
  try {
    // console.log("fetchDataPermission");
    const res = await getPermission();
    console.log(res,'awd');

    if (res) {
      const mapData = res.map((data, index) => {
        return {
          index: (index += 1),
          id: data.permission_group_id,
          code: data.permission_group_code,
          name: data.permission_group_name,
          modules: data.modules,
        };
      });

      const mapOptions = res.map((data) => {
        return {
          label: data.permission_group_name,
          value: data.permission_group_id,
        };
      });

      dataTableTab1.value = mapData;
      modalFormItemUsers[2].options = mapOptions;
    } 
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

const fetchDataUser = async () => {
  try {
    // console.log("fetchDataUser");
    const res = await getUser();
    console.log(res);
    if(!res) return
    const mapData = res
      .map((data) => {
        return {
          id: data.id,
          email: data.email,
          name: data.name,
          createDate: formatDate(data.create_dtm),
          group: data.permission_groups[0].permission_group_name,
          active: data.active,
        };
      })
      .filter((f) => f.active == true);

    dataTableTab2.value = mapData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

onMounted(async () => {
  // console.log(props.column);
  await fetchDataModuleItems();
  await fetchDataPermission();
  await fetchDataUser();
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

/* ::v-deep .ant-table-thead > tr > th {
  background-color: white !important;
  border: none !important;
} */

::v-deep .ant-table-tbody > tr:hover > td {
  background-color: #f5f5f5 !important;
}

::v-deep .ant-table-cell {
  border: none !important;
}
</style>