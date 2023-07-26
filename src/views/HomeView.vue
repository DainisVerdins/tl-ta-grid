<template>
    <TheTimePickerBar  />
    <VehicleTable :filter-date="filteringDate" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TheTimePickerBar from '@src/components/timepicker-bar/TheTimePickerBar.vue';
import VehicleTable from '@src/components/vehicle-table/VehicleTable.vue';


export default defineComponent({
  components: { TheTimePickerBar, VehicleTable },
  
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
  