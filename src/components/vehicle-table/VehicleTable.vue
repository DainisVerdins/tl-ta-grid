<template>
    <div class="vehicle-table">
        <TableLine
            :lineNumber="vehicleLines[0].lineNumber.toString()"
            :vehicles="vehicleLines[0].vehicles"
        />
        {{ filterDate }}
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import TableLine from '@src/components/vehicle-table/TableLine.vue';
import { VehicleLine } from '@src/interfaces/vehicle-line';

export default defineComponent({
    components: { TableLine },
    props: {
        vehicleLines:{
            required: true,
            type: Array as PropType<VehicleLine[]>,
        },
        filterDate:{
            required: true,
            type: String,
        },
    },
})
</script>
    
<style scoped lang="scss">
  .vehicle-table {
    margin: 20px;
    padding: 10px;
    border: 1px solid red;
  }
  </style>
    