<template>
    <div :class="['cell container', `size-${props.cellHeight}`]">
        {{ props.label }}
        <slot name="body" />
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps({
    label: { type: String, required: false },
    cellHeight: { type: String as () => 'md'  | 'lg', default: 'md' },
});
</script>

<style scoped lang="scss">
    .cell {
        min-width: 4rem;
        color: black;
        font-size: 1vw;
        text-align: center;
        background-color: #fff;
    }

    .size {
        &-md {
            min-height: 1.5rem;
            padding: calc(1.5rem / 2) 0;
        }
        &-lg {
            min-height: 3rem;
            padding: calc(3rem / 2) 0;
        }
    }
</style>