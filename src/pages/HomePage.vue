<template>
  <div>
    <TimePickerBar @date="filterRecords"/>
      <!-- For vertical Grid component-->
      <p>{{ filteringDate }}</p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TimePickerBar from '@src/components/timepicker-bar/TimePickerBar.vue';

export default defineComponent({
  components: { TimePickerBar },
  
  data() {
    return {
      filteringDate: new Date(),
    }
  },

  methods: {
    filterRecords(date: Date): void {
      this.filteringDate = date;
    }
  }
})
</script>
  
<style scoped lang="scss">
</style>
  