<template>
    <TimePickerBar @date="changeFilterDate" />
    <VehicleTable :filter-date="filteringDate" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TimePickerBar from '@src/components/timepicker-bar/TimePickerBar.vue';
import VehicleTable from '@src/components/vehicle-table/VehicleTable.vue';


export default defineComponent({
  components: { TimePickerBar, VehicleTable },
  
  data() {
    return {
      filteringDate: '',
    }
  },

  methods: {
    changeFilterDate(newFilteringDate: string) {
      this.filteringDate = newFilteringDate;
    }
  }
})
</script>
  