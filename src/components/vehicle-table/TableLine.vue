<template>
    <div class="container table-line">
        <Cell :label="lineNumber" />
        <template v-for="vehicle in lineVehicles">
            <Cell
                :ref="`cell${vehicle.id}`"
                :label="vehicle.vehicleNumber"
                :vehicle="vehicle"
                @clicked-vehicle="showModel"
                hover
            />
        </template>
        <template v-for="_n in emptyCellsAmount">
            <Cell empty-cell />
        </template>
    </div>
    <b-modal
        v-model="modalShow" 
        title="Vai izdzēst šo transportlīdzeklī?"
    >
        <p class="my-4">{{ deleteMessage }}</p>

        <template #footer>
            <b-button
                class="float-right"
                variant="primary"
                @click="hideModal"
            >
                Atcelt
            </b-button>
            <b-button
                class="float-right"
                variant="danger"
                @click="deleteVehicle"
            >
                Izņemt
            </b-button>
        </template>
    </b-modal>
</template>
    
<script lang="ts">
import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { PropType, defineComponent } from 'vue';
import Cell from '@src/components/vehicle-table/Cell.vue';
import { constants } from '@src/constants/constants';

export default defineComponent({
    components: { Cell },
    emits: ['remove'],
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
    data(){
        return {
            lineVehicles: [] as AssignedVehicle[],
            emptyCellsAmount: 0,
            modalShow: false,
            vehicleToDelete: {} as AssignedVehicle
        }
    },
    mounted() {
        this.lineVehicles = this.vehicles.slice(0, 14);
        
        if (this.lineVehicles.length < constants.MAX_LINES_IN_ROW)
            this.emptyCellsAmount = constants.MAX_LINES_IN_ROW - this.lineVehicles.length;
    },
    computed: {
        deleteMessage(): string {
            return `Vai izņemt transportlīdzekli "${this.vehicleToDelete.vehicleNumber}" no līnijas?`
        }
    },
    methods: {
        showModel(vehicle: AssignedVehicle): void {
            this.modalShow = true;
            this.vehicleToDelete = vehicle;
        },

        deleteVehicle(): void {
            this.hideModal();
            
            // @ts-ignore //general approach for this.$refs in typescript
            this.$refs[`cell${this.vehicleToDelete.id}`][0].setCellToBeEmpty();

            this.$emit('remove',this.vehicleToDelete);
            
        },

        hideModal(): void {
            this.modalShow = false;
        }
    },
})
</script>
    
<style scoped lang="scss">
.table-line {
    display: flex;
    color: black;
    margin: 0;
    padding: 0;
    border: 1px solid black;
}
</style>
    