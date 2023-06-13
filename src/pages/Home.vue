<template>
  <div v-if="isLoaded">
    <TimePickerBar @date="filterRecords"/>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TimePickerBar from '@src/components/timepicker-bar/TimePickerBar.vue';
import vehicleService from '@src/services/vehicle-service';
import { VehicleLine } from '@src/interfaces/vehicle-line';

export default defineComponent({
  components: { TimePickerBar },
  
  data() {
    return {
      filteringDate: '',
      defaultVehicleLines: [] as VehicleLine[],
      filteredVehicleLines: [] as VehicleLine[],
      isLoaded: false
    }
  },

  async mounted(): Promise<void> {
    const vehicleLines = await vehicleService.getVehiclesByLines();
    this.defaultVehicleLines = vehicleLines;
    this.filteredVehicleLines = Object.assign(this.filteredVehicleLines, vehicleLines);

    this.isLoaded = true;
  },

  methods: {
    filterRecords(date: string): void {
      this.filteringDate = date;

      this.filteredVehicleLines.length = 0;
      // Assumed according task what
      // assignedToLineDate < filteringDate < technicalInspectionCopleteDate
      for (const vehicleLine of this.defaultVehicleLines) {
        console.log(vehicleLine);
        this.filteredVehicleLines.push({
          lineNumber: vehicleLine.lineNumber,
          vehicles: vehicleLine.vehicles.filter((vehicle) => {
            return (vehicle.assignedToLineDate < this.filteringDate) && (vehicle.technicalInspectionCopleteDate ? (this.filteringDate < vehicle.technicalInspectionCopleteDate) : true );
          })
        } as VehicleLine)
      }
    }
  }
})
</script>
  
<style scoped lang="scss">
</style>
  