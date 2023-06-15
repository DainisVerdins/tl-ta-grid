<template>
    <div class="table-line">
        <HeaderCell
            :label="lineNumber.toString()"
            first-cell
            :class="[lastLine ? 'first-element' : '']"
        />
        <template v-for="(vehicle, index) in lineVehicles">
            <TableCell
                :ref="`cell${vehicle.id}`"
                :label="vehicle.vehicleNumber"
                :vehicle="vehicle"
                @clicked-vehicle="showModel"
                :last-cell="isLastFilledCell(index + 1)"
                :can-be-delete="canDeleteVehicle(vehicle)"
                :class="[lastLine && isLastFilledCell(index + 1) ? 'last-element' : '']"
            />
            
        </template>
        <template v-for="_n in emptyCellsAmount">
            <TableCell
                :last-cell="isLastEmptyCell(_n)"
                empty-cell
                :class="[lastLine && isLastEmptyCell(_n) ? 'last-element' : '']"
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
        cellAmount: {
            default: 14,
            type: Number
        },
        lastLine: {
            default: false,
            type: Boolean
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
        this.lineVehicles = this.vehicles.slice(0, this.cellAmount);
        
        if (this.lineVehicles.length < this.cellAmount)
            this.emptyCellsAmount = this.cellAmount - this.lineVehicles.length;
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
        },
        isLastEmptyCell(value: Number): boolean {
            return value === this.emptyCellsAmount;
        },
        isLastFilledCell(value: Number): boolean {
            return value === this.cellAmount;
        }
    },
})
</script>
    
<style scoped lang="scss">
@import '@src/styles/variables';
.table-line {
    display: flex;
    color: black;
    padding: 0;


    .first-element {
        border-bottom-left-radius: $border-radius;
    }

    .last-element {
        border-bottom-right-radius: $border-radius;
    }
}
</style>
    