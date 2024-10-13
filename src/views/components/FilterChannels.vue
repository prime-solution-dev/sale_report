
<style>
  .dropdown_channel {
    position: relative;
  }</style>
<template>
<div class="form-group">
<label for="channelSelect">Channel</label>
<div class="dropdown_channel">
    <button  class="btn btn-dropdown dropdown-toggle"  type="button"  id="dropdownSelectChannel" @click.stop="ToggleSelectChannel">
    {{ selectedChannels.length ? truncateText(selectedChannels.join(', '), 2) : 'Select Channel' }}
    </button>
    <div class="dropdown-menu_channel" v-if="isDropdownOpen">
        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input  type="checkbox"  id="select-all" :checked="isAllSelected"  @change="toggleSelectAll" />  All
    </label>
    <div v-for="(channel, index) in GetChannel" :key="index">
        <label :for="'channel-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'channel-' + index" 
            :name="'channel[]'" 
            :value="channel.code" 
            v-model="selectedChannelIDs" 
            @change="updateSelectedChannels" 
        />
        {{ channel.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchGetChannel ,fetchStoreType} from '../../services/reportapi/getdataApi';
export default {
 
 
  data() {
   
    return {
     

      //GetChannel: null,
      GetChannel: [],
      selectedChannelIDs: [],
      isDropdownOpen: false,
      //
     
      error: null,
      loading: false,
      
    };
  },
  methods: {
  
    async fetchData() {
      this.loading = true;
      this.error = null;
    //  const chanelid = this.selectedChannel;
      try {
        this.GetChannel = await fetchGetChannel();
        
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ToggleSelectChannel() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    updateSelectedChannels() {
      this.$emit('update:channels', this.selectedChannelIDs); // ส่งค่า selectedChannelIDs ไปยังคอมโพเนนต์หลัก
      if (this.selectedChannelIDs.length) {
        this.fetchStoreType(); // เรียกใช้ฟังก์ชัน fetchStoreType ใหม่
      } else {
        this.GetStoreType = []; // เคลียร์เมื่อไม่มีการเลือก channel
      }
    },

    async fetchStoreType() {
        this.loading = true;
        this.error = null;
        try {
          // รับค่า store type โดยกรองตาม channelIDs ที่เลือก
          this.GetStoreType = await fetchStoreType(this.selectedChannelIDs);
        } catch (error) {
          this.error = error; // จัดการข้อผิดพลาด
          console.error(this.error);
        } finally {
          this.loading = false; // ปิดสถานะโหลด
        }
      }
    ,

    toggleSelectAll(event) {
      this.selectedChannelIDs = event.target.checked ? this.GetChannel.map(channel => channel.code) : [];
      
      this.updateSelectedChannels(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
   
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdownChannel(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_channel')) {
          this.isDropdownOpen = false;
        }
      }
      
  },
  computed: {
  
    ///dropdown channels
    selectedChannels() {
      return this.selectedChannelIDs;
    },
    isAllSelected() {
      return this.selectedChannelIDs.length === this.GetChannel.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdownChannel);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownChannel);
  }
  
};


</script>
