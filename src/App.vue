<template>
  <div class="page">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomePage from '@src/pages/HomePage.vue';
export default defineComponent({
  components: { HomePage }

})
</script>

<style scoped lang="scss">
.page {
  margin: 1.25rem;
  padding: 1.25rem;
}
</style>
