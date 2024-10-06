
<template>
  <div>
    <input type="text" ref="datepicker" />
  </div>

 
</template>
<style scoped>
.month-link {
  background-color: rgba(255, 0, 0, 0.5); /* สีพื้นหลังเพื่อดูว่ามีการแสดงอยู่ */
  z-index: 9999; /* เพิ่ม z-index เพื่อให้แน่ใจว่าอยู่ด้านบน */
}
.ui-widget.ui-widget-content {
    border: 1px solid #c5c5c5;
    display: none!important;
}
/* ปิดการแสดงวันที่ */
.custom-datepicker .ui-datepicker-calendar {
  display: none !important;  /* ซ่อนปฏิทินที่แสดงวันที่ด้วย !important */
}

/* ปรับแต่งส่วนของเดือน */
.custom-datepicker .ui-datepicker-month {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  text-align: center;
}

.custom-datepicker .ui-datepicker-month .ui-state-default {
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}

/* ปรับเดือนที่ถูกเลือก */
.custom-datepicker .ui-datepicker-month .ui-state-active {
  background-color: #4CAF50;
  color: white;
}

/* ปิดปุ่ม "Done" ที่ด้านล่าง */
.custom-datepicker .ui-datepicker-buttonpane {
  display: none;
}

</style>
<script>
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker-v2';
import 'jquery-ui/themes/base/theme.css';


export default {
  mounted() {
    const today = new Date();
    const currentMonth = today.getMonth()-1;
    const currentYear = today.getFullYear();

    $(this.$refs.datepicker).datepicker({
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      dateFormat: 'MM yy',
      beforeShow: (input, inst) => {
        $(inst.dpDiv).addClass('custom-datepicker');
      },
      onClose: (dateText, inst) => {
        const month = inst.selectedMonth;
        const year = inst.selectedYear;
        $(this.$refs.datepicker).datepicker('setDate', new Date(year, month, 1));
        this.$emit('dateSelected', { year, month });  // ส่งอีเวนต์กลับไป
      },
      // onChangeMonthYear: (year, month) => {
      onChangeMonthYear: () => {
        setTimeout(() => {
          $('.ui-datepicker-calendar').hide();
        }, 0);
        // console.log(year, month);
      },
      beforeShowDay: () => [false, "", ""], // ปิดการแสดงวัน
      defaultDate: new Date(currentYear, currentMonth, 1),
    }).datepicker("setDate", new Date(currentYear, currentMonth, 1));

    this.addEventListeners();
    // console.log('Initializing datepicker');
  },

  methods: {
    addEventListeners() {
      $(document).on('click', '.month-link', (event) => {
        event.preventDefault();
        const month = $(event.currentTarget).data('month');
        const year = $(event.currentTarget).data('year');
       // const inst = $(this.$refs.datepicker).datepicker('instance');

      const inst = $(this.$refs.datepicker).data("datepicker");
        console.log(inst);

        if (inst) {
          inst.selectedMonth = month;
          inst.selectedYear = year;
          inst.drawMonth = month;
          inst.drawYear = year;

          // อัปเดตวันที่ใน datepicker
          $(this.$refs.datepicker).datepicker("setDate", new Date(year, month, 1));
          $(this.$refs.datepicker).datepicker("refresh");
        }
        
       // console.log('Month link clicked: ', month, year); // เพิ่มการตรวจสอบที่นี่
      });
    }
  },

  beforeUnmount() {
    $(document).off('click', '.month-link');
  }
};

</script>


