<template>
    <div class="container table-line">
        <HeaderCell
            :label="lineNumber.toString()"
            first-cell
        />
        <template v-for="(vehicle, index) in lineVehicles">
            <TableCell
                :ref="`cell${vehicle.id}`"
                :label="vehicle.vehicleNumber"
                :vehicle="vehicle"
                @clicked-vehicle="showModel"
                :last-cell="(index+1) === numberOfCellsInLine"
                :can-be-delete="canDeleteVehicle(vehicle)"
            />
            
        </template>
        <template v-for="_n in emptyCellsAmount">
            <TableCell
                :last-cell="_n === emptyCellsAmount"
                empty-cell
            />
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
import TableCell from '@src/components/vehicle-table/TableCell.vue';
import HeaderCell from '@src/components/vehicle-table/HeaderCell.vue';

export default defineComponent({
    components: { TableCell, HeaderCell },
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
        
        numberOfCellsInLine: {
            default: 14,
            type: Number,
        }
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
        this.lineVehicles = this.vehicles.slice(0, this.numberOfCellsInLine);
        
        if (this.lineVehicles.length < this.numberOfCellsInLine)
            this.emptyCellsAmount = this.numberOfCellsInLine - this.lineVehicles.length;
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
        },
        canDeleteVehicle(vehicle: AssignedVehicle): boolean {
            return Boolean(vehicle?.technicalInspectionCopleteDate);
        }
    },
})
</script>
    
<style scoped lang="scss">
.table-line {
    display: flex;
    color: black;
    padding: 0;
}
</style>
    