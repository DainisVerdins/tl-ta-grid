<template>
    <div class="table-header-line">
        <HeaderCell
            :label="label"
            :cell-height="props.cellHeight"
            first-cell
            class="cell-border-top first-header-cell"
        />
        <template v-for="n in props.cellAmount">
            <HeaderCell
                :label="n.toString()"
                :cell-height="props.cellHeight"
                :class="['cell-border-top', n === props.cellAmount ? 'last-header-cell': '']"
            />
        </template>
    </div>
</template>
    
<script setup lang="ts">
import HeaderCell from '@src/components/vehicle-table/HeaderCell.vue';

const props = defineProps({
    label: { type: String, required: true },
    cellHeight: { type: String as () => 'md'  | 'lg', default: 'md', },
    cellAmount: { type: Number, default: 14 },
});
</script>
    
<style scoped lang="scss">
@import '@src/styles/variables';
.table-header-line {
    display: flex;
    color: black;
    padding: 0;

    .cell-border-top {
        border-top: 1px solid black;
    }

    .first-header-cell {
        border-top-left-radius: $border-radius;
    }
    .last-header-cell {
        border-top-right-radius: $border-radius;
    }
}
</style>
    