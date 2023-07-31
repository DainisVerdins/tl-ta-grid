<template>
    <TheCell 
        :label="props.label"
        :class="['header-table-cell', props.lastCell ? 'last-table-cell' : '', props.firstCell ? 'first-header-table-cell' : '']" 
    />
</template>

<script setup lang="ts">
import TheCell from '@src/components/cell/TheCell.vue';

const props = defineProps({
    label: { type: String, required: true },
    lastCell: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    firstCell: { type: Boolean, default: false },
    emptyCell: { type: Boolean, default: false },
});


</script>
<style scoped lang="scss">
.header-table-cell {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    background-color: gray;
    font-weight: bold;
}

.last-header-table-cell {
    border-right: 1px solid black;
}

.first-header-table-cell {
    border-left: 1px solid black;
}
</style>