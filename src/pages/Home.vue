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
      mutableVehicleLinesDict: {} as VehicleDictionaryLine,
    }
  },

  async mounted(): Promise<void> {
    const vehicleLineDict = await vehicleService.getVehiclesByLines();

    this.defaultVehicleLinesDict = vehicleLineDict;
    this.mutableVehicleLinesDict = vehicleLineDict;
  },

  methods: {
    filterRecords(date: Date): void {
      this.filteringDate = date;
      const filteringDateString = this.filteringDate.toDateString();

      // Assumed according task what
      // assignedToLineDate < filteringDate < technicalInspectionCopleteDate
      for (const [key] of Object.entries(this.defaultVehicleLinesDict)) {
        this.mutableVehicleLinesDict[Number(key)] = this.defaultVehicleLinesDict[Number(key)].filter((vehicle) => { 
          return (vehicle.assignedToLineDate < filteringDateString) && (vehicle.technicalInspectionCopleteDate ? (filteringDateString < vehicle.technicalInspectionCopleteDate) : true );
        })
      }
    }
  }
})
</script>
  
<style scoped lang="scss">
</style>
  