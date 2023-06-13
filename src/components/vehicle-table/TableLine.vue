<template>
    <div class="container">
        <Cell :label="lineNumber"/>
        <template v-for="vehicle in lineVehicles.slice(0, 14)">
            <Cell
                :ref="`cell${vehicle.id}`"
                :label="vehicle.vehicleNumber"
                :id="vehicle.id"
                @remove="removeVehicle"
                can-click
            />
        </template>
    </div>
</template>
    
<script lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, defineComponent } from 'vue';
import Cell from '@src/components/vehicle-table/Cell.vue';

export default defineComponent({
    components: { Cell },
    data(){
        return {
            lineVehicles: [] as AssignedVehicle[]
        }
    },
    mounted() {
        this.lineVehicles = this.vehicles;
    },
    props: {
        lineNumber:{
            required: true,
            type: String,
        },
        vehicles:{
            required: true,
            type: Array as PropType<AssignedVehicle[]>,
        },
    },
    methods: {
        removeVehicle(vehicleId: Number): void {
            //console.log(vehicleId);
            this.$refs[`cell${vehicleId}`][0].setCellToBeEmpty(); // Get make cell from ref to bee read only
        }
    },
})
</script>
    
<style scoped lang="scss">
</style>
    