<template>
    <TheTimePickerBar @selectedDate="changeFilterDate" />
    <VehicleTable :filter-date="filteringDate" />
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

import TheTimePickerBar from '@src/components/timepicker-bar/TheTimePickerBar.vue';
import VehicleTable from '@src/components/vehicle-table/VehicleTable.vue';


const filteringDate: Ref<string> = ref('');

const changeFilterDate = ((newFilteringDate: string): void => {
  filteringDate.value = newFilteringDate;
});

</script>