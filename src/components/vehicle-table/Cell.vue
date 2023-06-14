<template>
    <template v-if="isClickable">
        <b-button
          variant="dark" 
          squared
          class="cell is-clickable"
        >
            {{ label }}
        </b-button>
    </template>
    <template v-else-if="isEmptyCell" >
        <b-button
          variant="dark" 
          squared
          disabled
          class="cell" 
        >
        </b-button>
    </template>
    <template v-else>
        <b-button
          variant="dark" 
          squared
          disabled
          class="cell" 
        >
        {{ label }}
        </b-button>
    </template>
</template>
    
<script lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, defineComponent } from 'vue'
  
export default defineComponent({
    emits: ['remove'],
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

        setCellToBeEmpty(): void {
            this.isEmpty = true;
        }
    },
})
</script>
    
<style scoped lang="scss">
.cell {
    // min-width: 6.66%; 
    min-width: calc(100% / 15);
    max-width: calc(100% / 15); // max 14 lines and +1 for index cell
    min-height: 1.563rem;
    background-color: transparent;
    padding: 0;
    color: black;
    font-size: 1vw;
}

.is-clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
  </style>
    