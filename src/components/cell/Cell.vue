<template>
    <div :class="['cell container',`size-${cellHeight}`]" >
        {{ label }}
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue'
  
export default defineComponent({
    props: {
        label:{
            required: false,
            type: String,
        },
        cellHeight: {
            default: 'md',
            type: String as () => 'md'  | 'lg'
        }
    },
})
</script>
    
<style scoped lang="scss">
    .cell {
        min-width: 4rem;
        background-color: transparent;
        color: black;
        font-size: 1vw;
        border: 1px solid black;
        text-align: center;
    }

    .size {
        &-md {
            min-height: 1.5rem;
            padding: calc(1.5rem / 2) 0;
        }
        &-lg {
            min-height: 3rem;
            //font-size: 1.25rem;
            //padding: 0.5rem 1rem;
            padding: calc(3rem / 2) 0;
        }
    }
</style>
    