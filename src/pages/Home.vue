<template>
  <div>
    <TimePickerBar @date="filterRecords"/>
      <!-- For vertical Grid component-->
      <p>{{ filteringDate }}</p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TimePickerBar from '@src/components/timepicker-bar/TimePickerBar.vue';
import vehicleService from '@src/services/vehicle-service';
import { VehicleDictionaryLine } from '@src/interfaces/vehicle-line-dict';

export default defineComponent({
  components: { TimePickerBar },
  
  data() {
    return {
      filteringDate: new Date(),
      defaultVehicleLinesDict: {} as VehicleDictionaryLine,
    }
  },

  async mounted(): Promise<void> {
    this.defaultVehicleLinesDict = await vehicleService.getVehiclesByLines();
  },

  methods: {
    filterRecords(date: Date): void {
      this.filteringDate = date;
    }
  }
})
</script>
  
<style scoped lang="scss">
</style>
  