<template>
  <div class="form-group">
    <label for="accountnameSelect">Key Account Name</label>
    <div class="dropdown_accountname">
      <button class="btn btn-dropdown dropdown-toggle" type="button" id="dropdownSelectAccountName" @click.stop="toggleSelectAccountName">
        {{ selectedAccountName.length ? truncateText(selectedAccountName.join(', '), 2) : 'Select Account Name' }}
      </button>
      <div class="dropdown-menu_accountname" v-if="isDropdownOpenAccountName">
        <label for="select-all" class="dropdown-item">
          <input type="checkbox" id="select-all" :checked="isAllSelectedAccountName" @change="toggleSelectAllName" /> All
        </label>
        <div v-for="(accountname, index) in GetAccountName" :key="index">
          <label :for="'accountname-' + index" class="dropdown-item">
            <input 
              type="checkbox" 
              :id="'accountname-' + index" 
              :name="'accountname[]'" 
              :value="accountname.code" 
              v-model="selectedAccountNameIDs" 
              @change="updateSelectedKeyAccountName" 
            />
            {{ accountname.code }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAccountNameByGroup } from '../../services/reportapi/getdataApi';

export default {
  props: {
    selectedAccountGroupIDs: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    selectedAccountGroupIDs: {
      immediate: true,
      handler(newVal) {
        if (newVal.length) {
          this.fetchAccountNameByGroup(newVal);
        } else {
          this.GetAccountName = [];
        }
      },
    },
  },
  data() {
    return {
      GetAccountName: [],
      selectedAccountNameIDs: [],
      isDropdownOpenAccountName: false,
      error: null,
      loading: false,
    };
  },
  methods: {
    async fetchAccountNameByGroup(groupIDs) {
      this.loading = true;
      this.error = null;
      try {
        this.GetAccountName = await fetchAccountNameByGroup(groupIDs);
      } catch (error) {
        this.error = error;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    toggleSelectAccountName() {
      this.isDropdownOpenAccountName = !this.isDropdownOpenAccountName;
    },

    async updateSelectedKeyAccountName() {
      this.$emit('update:accountnames', this.selectedAccountNameIDs);
    },

    toggleSelectAllName(event) {
      this.selectedAccountNameIDs = event.target.checked ? this.GetAccountName.map(accountname => accountname.code) : [];
      this.updateSelectedKeyAccountName();
    },

    truncateText(text, colCount) {
      const maxLength = colCount * 10;
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    closeDropdownAccountName(event) {
      if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_accountname')) {
        this.isDropdownOpenAccountName = false;
      }
    }
  },
  computed: {
    selectedAccountName() {
      return this.selectedAccountNameIDs;
    },
    isAllSelectedAccountName() {
      return this.selectedAccountNameIDs.length === this.GetAccountName.length;
    }
  },
  created() {
    // เรียก fetchAccountNameByGroup ตาม selectedAccountGroupIDs
    this.fetchAccountNameByGroup(this.selectedAccountGroupIDs);
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownAccountName);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownAccountName);
  }
};
</script>

<style>
.dropdown_accountname {
  position: relative;
}
</style>
