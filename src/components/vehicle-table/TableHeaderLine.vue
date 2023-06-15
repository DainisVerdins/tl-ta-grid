<template>
    <div class="table-header-line">
        <HeaderCell
            :label="label"
            :cell-height="cellHeight"
            first-cell
            class="cell-border-top first-header-cell"
        />
        <template v-for="n in cellAmount">
            <HeaderCell
                :label="n.toString()"
                :cell-height="cellHeight"
                :class="['cell-border-top', n === cellAmount ? 'last-header-cell': '']"
            />
        </template>
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import HeaderCell from '@src/components/vehicle-table/HeaderCell.vue';
  
export default defineComponent({
    components: { HeaderCell },
    props: {
        label:{
            required: true,
            type: String,
        },
        cellHeight: {
            default: 'md',
            type: String as () => 'md'  | 'lg'
        },
        cellAmount: {
            default: 14,
            type: Number
        }
    },
})
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
    