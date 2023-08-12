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
                <TableHeaderLine label="Vieta" cell-height="lg" :cell-amount="cellAmount" />
                <template v-for="(vehicleLine, index) in filteredVehicleLines" v-bind:key="vehicleLine.vehicles">
                    <TableLine :lineNumber="vehicleLine.lineNumber.toString()" :vehicles="vehicleLine.vehicles"
                        @remove="removeVehicle" :cell-amount="cellAmount" :last-line="isLastLine(index)" />
                </template>
            </div>
        </template>
        <template v-else>
            <div class="d-flex justify-content-center mb-3">
                <p>Loading data please wait!</p>
                <b-spinner label="Loading..." small />
            </div>
        </template>
    </div>
</template>
    
<script setup lang="ts">

import TableLine from '@src/components/vehicle-table/TableLine.vue';
import TableHeaderLine from '@src/components/vehicle-table/TableHeaderLine.vue';

import vehicleService from '@src/services/vehicle-service';
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { VehicleLine } from '@src/interfaces/vehicle-line';
import { Ref, computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const props = defineProps({
    filterDate: { type: String, required: true },
    cellAmount: { type: Number, default: 14 },
});

onMounted(async () => {
    vehicleLines.value = await vehicleService.getVehiclesByLines();
    isLoaded.value = true;
});

const filteredVehicleLines = computed((): VehicleLine[] => {
    // Assumed according task what
    // assignedToLineDate < filteringDate < technicalInspectionCopleteDate
    let output: VehicleLine[] = vehicleLines.value;
    for (let vehicleLine of output) {
        vehicleLine.vehicles = vehicleLine.vehicles.filter((vehicle) => {
            return (vehicle.assignedToLineDate < props.filterDate) && (vehicle.technicalInspectionCopleteDate ? (props.filterDate < vehicle.technicalInspectionCopleteDate) : true);
        });
    }

    return output;
});

const vehicleLines: Ref<VehicleLine[]> = ref([]); // FIXME: Probably do not to be reactive!
const isLoaded: Ref<boolean> = ref(false);
const $toast = useToast();

const removeVehicle = (async (vehicleToRemove: AssignedVehicle): Promise<void> => {
    try {
        await vehicleService.removeVehicleById(vehicleToRemove.id);

        for (let vehicleLine of vehicleLines.value) {
            if (vehicleLine.lineNumber === vehicleToRemove.assignedLineNumber) {
                vehicleLine.vehicles = vehicleLine.vehicles.filter((vehicle: AssignedVehicle) => { return vehicle.id !== vehicleToRemove.id; });;
                break;
            }
        }
        $toast.success(`Transportlīdzeklis ar numuru "${vehicleToRemove.vehicleNumber}" tika veiksmīgi dzēsts!`);
    } catch (error: unknown) {
        $toast.error((error as Error).message);
    }
});

const isLastLine = ((index: number): boolean => {
    return (index + 1) === filteredVehicleLines.value.length;
});
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
    