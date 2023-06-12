<template>
  <div class="page">
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from '@src/pages/Home.vue';

export default defineComponent({
  components: { Home }
})
</script>

<style scoped lang="scss">
.page {
  margin: 1.25rem;
  padding: 1.25rem;
}
</style>
