<template>
  <div>
    <TimePickerBar/>
      <!-- For vertical Grid component-->
      <p>Some text</p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TimePickerBar from '@src/components/timepicker-bar/TimePickerBar.vue';
export default defineComponent({
  components: { TimePickerBar }
})
</script>
  
<style scoped lang="scss">
</style>
  