<template>
    <template v-if="isClickable">
        <b-button
          @click="remove"
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
import { defineComponent } from 'vue'
  
export default defineComponent({
    emits: ['remove'],
    props: {
        id:{
            required: false,
            type: Number,
        },
        label:{
            required: false,
            type: String,
        },
        canClick: {
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
            return this.canClick && (!this.isEmptyCell);
        },

        isEmptyCell(): boolean {
            return this.emptyCell || this.isEmpty;
        }
    },
    methods: {
        remove(): void {
            this.$emit('remove', this.id);
        },

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
    color: black;
}

.is-clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
  </style>
    