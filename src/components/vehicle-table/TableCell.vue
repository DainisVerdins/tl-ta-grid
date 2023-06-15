<template>
    <Cell
        @click="clickedVehicle"
        :label="cellLabel"
        :class="['table-cell', isClickable ? 'clickable' : '', lastCell ? 'is-last-table-cell' : '']"
    />
</template>
    
<script lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, defineComponent } from 'vue'
  
import Cell from '@src/components/cell/Cell.vue';

export default defineComponent({
    components: { Cell },

    emits: ['clickedVehicle'],
    props: {
        vehicle: {
            required: false,
            type: Object as PropType<AssignedVehicle>,
        },
        label: {
            required: false,
            default: '',
            type: String,
        },
        lastCell: {
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
    computed: {
        isClickable(): boolean {
            return !this.isEmpty && (!this.emptyCell);
        }
    },
    methods: {
        clickedVehicle(): void {
            if (!this.isEmpty)
                this.$emit('clickedVehicle', this.vehicle);
        },
        setCellToBeEmpty(): void {
            this.isEmpty = true;
            this.cellLabel = '';

        }
    },
})
</script>
    
<style scoped lang="scss">
.table-cell {
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid black;
    border-left: none;
    border-top: none;
}

.is-last-table-cell {
    border-right: 1px solid black;
}

.clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
  </style>
    