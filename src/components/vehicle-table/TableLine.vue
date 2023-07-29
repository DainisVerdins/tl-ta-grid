<template>
    <div class="table-line">
        <HeaderCell :label="lineNumber.toString()" first-cell :class="[lastLine ? 'first-element' : '']" />
        <TableCell v-for="(vehicle, index) in vehiclesInLine" :key="vehicle.id" :label="vehicle.vehicleNumber"
            ref="cellRefs" :vehicle="vehicle" @clicked-vehicle="showPromptForDelete(vehicle)"
            :can-be-deleted="canDeleteVehicle(vehicle)"
            :class="[lastLine && isLastFilledCell(index + 1) ? 'last-element' : '']" />

        <template v-for="_n in emptyCellsAmount">
            <TableCell empty-cell :class="[lastLine && isLastEmptyCell(_n) ? 'last-element' : '']" />
        </template>
    </div>
    <b-modal v-model="showDeletePrompt" title="Vai izdzēst šo transportlīdzeklī?">
        <p class="my-4">{{ deleteMessage() }}</p>

        <template #footer>
            <b-button class="float-right" variant="primary" @click="hideModal">
                Atcelt
            </b-button>
            <b-button class="float-right" variant="danger" @click="deleteVehicle">
                Izņemt
            </b-button>
        </template>
    </b-modal>
</template>
    
<script setup lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, Ref, onMounted, ref } from 'vue';
import TableCell from '@src/components/vehicle-table/TableCell.vue';
import HeaderCell from '@src/components/vehicle-table/HeaderCell.vue';

const props = defineProps({
    lineNumber: { type: String, required: true },
    vehicles: { type: Array as PropType<AssignedVehicle[]>, required: true },
    cellAmount: { type: Number, default: 14 },
    lastLine: { type: Boolean, default: false },
});
const emit = defineEmits<{
    'remove': [vehicleToDelete: AssignedVehicle]
}>();

onMounted(() => {
    vehiclesInLine.value = props.vehicles.slice(0, props.cellAmount);

    if (vehiclesInLine.value.length < props.cellAmount)
        emptyCellsAmount.value = props.cellAmount - vehiclesInLine.value.length;
});

const vehiclesInLine: Ref<AssignedVehicle[]> = ref([]);
const emptyCellsAmount: Ref<number> = ref(0);
const showDeletePrompt: Ref<boolean> = ref(false);
const vehicleToDelete: Ref<AssignedVehicle> = ref({} as AssignedVehicle);
const cellRefs = ref<InstanceType<typeof TableCell>[]>([]);

const showPromptForDelete = ((vehicle: AssignedVehicle): void => {
    showDeletePrompt.value = true;
    vehicleToDelete.value = vehicle;
});
const deleteVehicle = ((): void => {
    hideModal();
    const cellToHide = cellRefs.value.find(cellRef => cellRef.$props.vehicle?.id === vehicleToDelete.value.id);
    cellToHide?.setCellToBeEmpty();

    emit('remove',vehicleToDelete.value);
});
const hideModal = ((): void => {
    showDeletePrompt.value = false;
});
const canDeleteVehicle = ((vehicle: AssignedVehicle): boolean => {
    return Boolean(vehicle?.technicalInspectionCopleteDate);
});
const isLastEmptyCell = ((value: Number): boolean => {
    return value === emptyCellsAmount.value;
});
const isLastFilledCell = ((value: Number): boolean => {
    return value === props.cellAmount;
});
const deleteMessage = ((): string => {
    return `Vai izņemt transportlīdzekli "${vehicleToDelete.value.vehicleNumber}" no līnijas?`;
});
</script>
    
<style scoped lang="scss">
@import '@src/styles/variables';

.table-line {
    display: flex;
    color: black;
    padding: 0;


    .first-element {
        border-bottom-left-radius: $border-radius;
    }

    .last-element {
        border-bottom-right-radius: $border-radius;
    }
}
</style>
    