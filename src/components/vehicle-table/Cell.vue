<template>
    <template v-if="isClickable">
        <div
            class="cell container is-clickable"
            @click="remove"
        >
            {{ label }}
        </div>
    </template>
    <template v-else-if="isEmptyCell" >
        <div class="cell container"></div>
    </template>
    <template v-else>
        <div class="cell container" >
            {{ label }}
        </div>
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
        isClickable: {
            default: false,
            type: Boolean
        },
        isEmptyCell: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        remove(): void {
            this.$emit('remove', this.id);
        },

        setDisabled(): void {
            console.log('YOU DISABLED ME!');
        }
    },
})
</script>
    
<style scoped lang="scss">
.cell {
    width: 100px; // TODO: change from px into rem
    height: 25px;
    padding: 0 10px 0 10px;
    border: 1px solid green;
    position: relative;
}

.is-clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
  </style>
    