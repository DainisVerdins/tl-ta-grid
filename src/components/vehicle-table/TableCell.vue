<template>
    <TheCell @click="clickedVehicle" :label="cellLabel" :class="['table-cell', clickableStyle]" ref="tableCell">
        <template #body v-if="props.canBeDeleted">
            <i class="bi bi-exclamation-circle" v-b-tooltip.hover.top
                title="Nevar izņemt TL, jo nav pabeigta teh apskate"></i>
        </template>
    </TheCell>
</template>
    
<script setup lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, Ref, computed, ref } from 'vue'
import TheCell from '@src/components/cell/TheCell.vue';

const props = defineProps({
    vehicle: { type: Object as PropType<AssignedVehicle>, required: false },
    label: { type: String, default: '', required: false },
    emptyCell: { type: Boolean, default: false },
    canBeDeleted: { type: Boolean, default: false },
});

const emit = defineEmits<{
    'clickedVehicle': [vehicle: AssignedVehicle]
}>();

const isEmpty: Ref<boolean> = ref(false);
const cellLabel: Ref<string> = ref(props.label);
const tableCell = ref(null);

const clickableStyle = computed((): string => {
    const isClickable = !isEmpty.value && (!props.emptyCell) && !props.canBeDeleted;

    return isClickable ? 'clickable' : '';
});

const clickedVehicle = (): void => {
    const isActiveVehicle: boolean = !props.canBeDeleted && Boolean(props.vehicle);

    if (!isEmpty.value && isActiveVehicle)
        emit('clickedVehicle', props.vehicle as AssignedVehicle);
};
//@ts-ignore
const setCellToBeEmpty = (): void => {
    isEmpty.value = true;
    cellLabel.value = '';
};

defineExpose({
    setCellToBeEmpty,
    tableCell
});
</script>
    
<style scoped lang="scss">
.table-cell {
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid black;
    border-left: none;
    border-top: none;
}

.clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
</style>
    