import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { VehicleLine } from '@src/interfaces/vehicle-line';

const vehicleService = {
    // returns dictionary where key is line number and value is array of AssignedVehicles with that line property
    // this heavy work must to be done in back-end
    getVehiclesByLines: async(): Promise<VehicleLine[]> => {

        const response = await fetch('src/data/db.json');
        const vehiclesData = await response.json();
        let vehicles: AssignedVehicle[] = [];
        for (const item of vehiclesData.items) {
            vehicles.push({
                id: item.id,
                assignedLineNumber: item.numurs,
                vehicleNumber: item.rn,
                assignedToLineDate: item.datums,
                technicalInspectionCopleteDate: item.s_datums,
            } as AssignedVehicle);
        }
        // In case if line Numbers are not from 1-12 or some lines are missing
        const lineNumbersSet = new Set<number>();
        for (const vehicle of vehicles)
            lineNumbersSet.add(vehicle.assignedLineNumber); 

        const lines: number[] = Array.from(lineNumbersSet).sort((a: any, b: any) => { return a - b; } );
        
        const output: VehicleLine[] = [];

        for (const line of lines) {
            output.push({
                lineNumber: line,
                vehicles: vehicles.filter((vehicle: AssignedVehicle) => { return vehicle.assignedLineNumber === line; })
            } as VehicleLine);
        }
        
        return output;
    },

    removeVehicleById: async(id: number): Promise<void> => {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(id), 1000)
        });
        await promise;
    }
}


export default vehicleService;