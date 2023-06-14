<template>
    <div class="vehicle-table" v-if="isLoaded">
        <template v-for="vehicleLine in filteredVehicleLines">
            <TableLine
                :lineNumber="vehicleLine.lineNumber.toString()"
                :vehicles="vehicleLine.vehicles"
                @remove="removeVehicle"
            />
        </template>
        {{ filterDate }}
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';

import TableLine from '@src/components/vehicle-table/TableLine.vue';
import vehicleService from '@src/services/vehicle-service';
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { VehicleLine } from '@src/interfaces/vehicle-line';

export default defineComponent ({
    components: { TableLine },
    props: {
        filterDate:{
            required: true,
            type: String,
        },
    },
    data(){
        return {
            vehicleLines: [] as VehicleLine[],
            emptyCellsAmount: 0,
            modalShow: false,
            vehicleToDelete: {} as AssignedVehicle,
            filteredVehicleLines: [] as VehicleLine[],
            isLoaded: false,
        }
    },
    async mounted(): Promise<void> {
        const vehicleLines = await vehicleService.getVehiclesByLines();
        this.vehicleLines = vehicleLines;
        this.filterRecordsByDate(this.filterDate);
        this.isLoaded = true;
    },
    methods: {
        filterRecordsByDate(filteringDate: string): void {
            this.filteredVehicleLines.length = 0;
            // Assumed according task what
            // assignedToLineDate < filteringDate < technicalInspectionCopleteDate
            for (const vehicleLine of this.vehicleLines) {
                this.filteredVehicleLines.push(
                    {
                        lineNumber: vehicleLine.lineNumber,
                        vehicles: vehicleLine.vehicles.filter((vehicle) => {
                            return (vehicle.assignedToLineDate < filteringDate) && (vehicle.technicalInspectionCopleteDate ? (filteringDate < vehicle.technicalInspectionCopleteDate) : true );
                        })
                    } as VehicleLine);
            }
        },
        async removeVehicle(vehicleToRemove: AssignedVehicle) {
            try {
                await vehicleService.removeVehicleById(vehicleToRemove.id);
                for (let vehicleLine of this.vehicleLines) {
                    if(vehicleLine.lineNumber === vehicleToRemove.assignedLineNumber) {
                        vehicleLine.vehicles = vehicleLine.vehicles.filter((vehicle: AssignedVehicle) => { vehicle.id !== vehicleToRemove.id; });
                        break;
                    }
                }
                this.$toast.success(`Transportlīdzeklis ar numuru "${vehicleToRemove.vehicleNumber}" tika veiksmīgi dzēsts!`);
            } catch (error: unknown) {
                this.$toast.error((error as Error).message);
            }
        },
    },
    watch: {
        filterDate(newDate: string) {
            this.filterRecordsByDate(newDate);
        },
  },
})
</script>
    
<style scoped lang="scss">
  .vehicle-table {
    margin: 20px;
    padding: 10px;
    border: 1px solid red;
  }
  </style>
    