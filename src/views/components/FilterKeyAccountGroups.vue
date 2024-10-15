<template>
  <div class="form-group">
    <label for="acgroupSelect">Key Account Group</label>
    <div class="dropdown_acgroup">
      <button class="btn btn-dropdown dropdown-toggle" type="button" id="dropdownSelectAccountGroup" @click.stop="toggleSelectAcGroup">
        {{ selectedAcGroups.length ? truncateText(selectedAcGroups.join(', '), 2) : 'Select Account Group' }}
      </button>
      <div class="dropdown-menu_acgroup" v-if="isDropdownOpen">
        <label for="select-all" class="dropdown-item">
          <input type="checkbox" id="select-all" :checked="isAllSelectedAcGroup" @change="toggleSelectAllGroup" /> All
        </label>
        <div v-for="(acgroup, index) in GetAccountGroup" :key="index">
          <label :for="'acgroup-' + index" class="dropdown-item">
            <input 
              type="checkbox" 
              :id="'acgroup-' + index" 
              :name="'acgroup[]'" 
              :value="acgroup.code" 
              v-model="selectedAccountGroupIDs" 
              @change="updateSelectedKeyAccountGroup" 
            />
            {{ acgroup.code }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAccountGroup, fetchAccountNameByGroup } from '../../services/reportapi/getdataApi';

export default {
  data() {
    return {
      GetAccountGroup: [],
      selectedAccountGroupIDs: [],
      isDropdownOpen: false,
      error: null,
      loading: false,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        this.GetAccountGroup = await fetchAccountGroup();
      } catch (error) {
        this.error = error;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    toggleSelectAcGroup() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    updateSelectedKeyAccountGroup() {
      this.$emit('update:accgroups', this.selectedAccountGroupIDs);
      if (this.selectedAccountGroupIDs.length) {
        this.fetchAccountNameByGroup();
      } else {
        this.GetAccountName = [];
      }
    },

    async fetchAccountNameByGroup() {
      this.loading = true;
      this.error = null;
      try {
        this.GetAccountName = await fetchAccountNameByGroup(this.selectedAccountGroupIDs);
      } catch (error) {
        this.error = error;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    toggleSelectAllGroup(event) {
      this.selectedAccountGroupIDs = event.target.checked ? this.GetAccountGroup.map(acgroup => acgroup.code) : [];
      this.updateSelectedKeyAccountGroup();
    },

    truncateText(text, colCount) {
      const maxLength = colCount * 10; 
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    closeDropdownAcGroup(event) {
      if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_acgroup')) {
        this.isDropdownOpen = false;
      }
    }
  },
  computed: {
    selectedAcGroups() {
      return this.selectedAccountGroupIDs;
    },
    isAllSelectedAcGroup() {
      return this.selectedAccountGroupIDs.length === this.GetAccountGroup.length;
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownAcGroup);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownAcGroup);
  }
};
</script>

<style>
.dropdown_acgroup {
  position: relative;
}
</style>
