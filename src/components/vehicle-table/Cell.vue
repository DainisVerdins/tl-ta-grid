<template>
    <template v-if="isClickable">
        <div
          :class="['cell is-clickable container',`size-${cellHeight}`]"
          @click="clickedVehicle"
        >
            {{ label }}
        </div>
    </template>
    <template v-else-if="isEmptyCell" >
        <div :class="['cell container',`size-${cellHeight}`]">
        </div>
    </template>
    <template v-else>
        <div :class="['cell  is-static container',`size-${cellHeight}`]">
            {{ label }}
        </div>
    </template>
</template>
    
<script lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, defineComponent } from 'vue'
  
export default defineComponent({
    emits: ['clickedVehicle'],
    props: {
        vehicle:{
            required: false,
            type: Object as PropType<AssignedVehicle>,
        },
        label:{
            required: false,
            type: String,
        },
        hover: {
            default: false,
            type: Boolean
        },
        emptyCell: {
            default: false,
            type: Boolean
        },
        cellHeight: {
            default: 'md',
            type: String as () => 'md'  | 'lg'
        }
    },
    data() {
        return {
            isEmpty: false,
        }
    },
    computed: {
        isClickable(): boolean {
            return this.hover && (!this.isEmptyCell);
        },

        isEmptyCell(): boolean {
            return this.emptyCell || this.isEmpty;
        }
    },
    methods: {
        clickedVehicle(): void {
            if (!this.isEmpty)
                this.$emit('clickedVehicle', this.vehicle);
        },
        setCellToBeEmpty(): void {
            this.isEmpty = true;
        }
    },
})
</script>
    
<style scoped lang="scss">
.cell {
    min-width: 4rem;//calc(100% / (14 + 1));
    //max-width: 50px;//calc(100% / (14 + 1)); // max 14 lines and +1 for index cell
    background-color: transparent;
    color: black;
    font-size: 1vw;
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    text-align: center;
}

.size {
    &-md {
        min-height: 1.5rem;
        padding: calc(1.5rem / 2) 0;
    }
    &-lg {
        min-height: 3rem;
        font-size: 1.25rem;
        padding: 0.5rem 1rem;
    }
}

.is-clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}

.is-static {
    background-color: gray;
    font-weight: 900;
}
  </style>
    