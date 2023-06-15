<template>
    <div class="container table-header-line">
        <HeaderCell
            :label="label"
            :cell-height="cellHeight"
            first-cell
        />
        <template v-for="n in cellAmount">
            <HeaderCell
                :label="n.toString()"
                :cell-height="cellHeight"
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
.table-header-line {
    display: flex;
    color: black;
    padding: 0;
}
  </style>
    