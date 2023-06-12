<template>
    <div
        class="car-cell container"
        @click="remove"
    >
        <div class="position-absolute top-50 start-50 translate-middle">
            <p>{{ vehicle.vehicleNumber }}</p>
        </div>
    </div>
</template>
    
<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
  
export default defineComponent({
    emits: ['vehicle'],
    props: {
        vehicle:{
            required: true,
            type: Object as PropType<AssignedVehicle>,
        },
    },
    methods: {
        remove(): void {
            this.$emit('vehicle', this.vehicle);
        }
    },
})
  </script>
    
  <style scoped lang="scss">
  .car-cell {
    width: 100px;
    height: 50px;
    border: 1px solid green;
    position: relative;
    p {
        margin-top: 0;
        margin-bottom: 0;
    }

    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
  }
  </style>
    