<template>
    <div>
      <!-- คุณสามารถลบ HTML โมดัลเดิมที่นี่ -->
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        default: ''
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      showModal() {
        Swal.fire({
          title: this.title,
          text: this.message,
          icon: this.isLoading ? 'info' : 'success', // แสดง loading หรือ success
          showLoaderOnConfirm: this.isLoading,
          allowOutsideClick: false,
          timer: this.isLoading ? null : 3000, // ปิดอัตโนมัติถ้าไม่โหลด
          didOpen: () => {
            if (this.isLoading) {
              Swal.showLoading();
            }
          },
        }).then((result) => {
          // เมื่อปิดโมดัล
          if (result.isConfirmed) {
            this.$emit('close');
          }
        });
      }
    },
    watch: {
      message(newMessage) {
        if (newMessage) {
          this.showModal();
        }
      },
      isLoading(newLoading) {
        if (newLoading) {
          this.showModal();
        }
      }
    },
    mounted() {
      this.showModal();
    }
  }
  </script>
  