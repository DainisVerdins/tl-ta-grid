<template>
    <div class="vehicle-table">
        <template v-if="!filterDate">
            <div class="d-flex justify-content-center mb-3">
                <div class="vehicle-table-stub">
                    <h1>Izvēlies datumu un laiku un spied "Parādīt"!</h1>
                </div>
            </div>
        </template>
        <template v-else-if="isLoaded">
            <div class="vehicle-table-grid">
                <TableHeaderLine
                    label="Vieta"
                    cell-height="lg"
                    :cell-amount="cellAmount"
                />
                <template 
                    v-for="(vehicleLine, index) in filteredVehicleLines" 
                    v-bind:key="vehicleLine.vehicles" 
                >
                    <TableLine
                        :lineNumber="vehicleLine.lineNumber.toString()"
                        :vehicles="vehicleLine.vehicles"
                        @remove="removeVehicle"
                        :cell-amount="cellAmount"
                        :last-line="isLastLine(index)"
                    />
                </template>
            </div>
        </template>
        <template v-else>
            <div class="d-flex justify-content-center mb-3">
                <p>Loading data please wait!</p>
                <b-spinner
                    label="Loading..."
                    small 
                />
            </div>
        </template>
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';

import TableLine from '@src/components/vehicle-table/TableLine.vue';
import TableHeaderLine from '@src/components/vehicle-table/TableHeaderLine.vue';

import vehicleService from '@src/services/vehicle-service';
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { VehicleLine } from '@src/interfaces/vehicle-line';

export default defineComponent ({
    components: { TableLine, TableHeaderLine },
    props: {
        filterDate: {
            required: true,
            type: String,
        },
        cellAmount: {
            default: 14,
            type: Number,
        }
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
        this.vehicleLines = await vehicleService.getVehiclesByLines(); 
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
                        vehicleLine.vehicles = vehicleLine.vehicles.filter((vehicle: AssignedVehicle) => { return vehicle.id !== vehicleToRemove.id; });;
                        break;
                    }
                }

                this.$toast.success(`Transportlīdzeklis ar numuru "${vehicleToRemove.vehicleNumber}" tika veiksmīgi dzēsts!`);
            } catch (error: unknown) {
                this.$toast.error((error as Error).message);
            }
        },
        isLastLine(index: number): boolean {
            return (index + 1) === this.filteredVehicleLines.length;
        }
    },
    watch: {
        filterDate(newDate: string) {
            this.filterRecordsByDate(newDate);
            this.$toast.info('Filtrēts!');
        },
  },
})
</script>
    
<style scoped lang="scss">
@import '@src/styles/variables';
  .vehicle-table {
    margin: $margin-normal;

    .vehicle-table-grid {
        border: $border-size solid pink;
        background-color: pink;
        border-radius: $border-radius;
    }

    .vehicle-table-stub {
        background: #fff;
        border-radius: $border-radius;
        margin: $margin-normal;
        padding: $padding-normal;
        background-color: pink;
    }
  }
  </style>
    