<template>
  <div v-if="isLoaded">
    <TimePickerBar @date="filterRecords"/>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TimePickerBar from '@src/components/timepicker-bar/TimePickerBar.vue';
import vehicleService from '@src/services/vehicle-service';
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { VehicleLine } from '@src/interfaces/vehicle-line';

export default defineComponent({
  components: { TimePickerBar },
  
  data() {
    return {
      filteringDate: new Date(),
      defaultVehicleLines: [] as VehicleLine[],
      filteredVehicleLines: [] as VehicleLine[],

      tmp: [] as AssignedVehicle[],
      line: 1,
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
    filterRecords(date: Date): void {
      this.filteringDate = date;
      const filteringDateString = this.filteringDate.toString();
      debugger;
      this.filteredVehicleLines.length = 0;

      // Assumed according task what
      // assignedToLineDate < filteringDate < technicalInspectionCopleteDate
      for (const vehicleLine of this.defaultVehicleLines) {
        console.log(vehicleLine);
        this.filteredVehicleLines.push({
          lineNumber: vehicleLine.lineNumber,
          vehicles: vehicleLine.vehicles.filter((vehicle) => {
            return (vehicle.assignedToLineDate < filteringDateString) && (vehicle.technicalInspectionCopleteDate ? (filteringDateString < vehicle.technicalInspectionCopleteDate) : true );
          })
        } as VehicleLine)
      }
    }
  }
})
</script>
  
<style scoped lang="scss">
</style>
  