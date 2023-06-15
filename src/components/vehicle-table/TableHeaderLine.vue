<template>
    <div class="container table-header-line">
        <Cell
            :label="label"
            :cell-height="cellHeight"
        />
        <template v-for="n in cellAmount">
            <Cell
                :label="n.toString()"
                :cell-height="cellHeight"
            />
        </template>
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import Cell from '@src/components/cell/Cell.vue';
  
export default defineComponent({
    components: { Cell },
    props: {
        label:{
            required: false,
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
    