<template>
    <TheCell
        :label="cellLabel"
        :class="['header-table-cell', lastCell ? 'last-table-cell' : '', firstCell ? 'first-header-table-cell' : '']"
    />
</template>
    
<script lang="ts">
import { defineComponent } from 'vue'
  
import TheCell from '@src/components/cell/TheCell.vue';

export default defineComponent({
    components: { TheCell },

    props: {
        label: {
            required: true,
            type: String,
        },
        lastCell: {
            default: false,
            type: Boolean
        },
        firstCell: {
            default: false,
            type: Boolean
        },
        emptyCell: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            isEmpty: false,
            cellLabel:'',
        }
    },
    mounted(){
        this.cellLabel = this.label;
    },
})
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
    