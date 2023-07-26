<template>
  <div class="page">
    <HomeView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeView from '@src/views/HomeView.vue';

export default defineComponent({
  components: { HomeView }
})
</script>

<style scoped lang="scss">
.page {
  background-color: #242424;
}
</style>
