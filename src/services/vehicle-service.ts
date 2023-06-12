import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';
import { VehicleDictionaryLine } from '@src/interfaces/vehicle-line-dict';

const vehicleService = {
    // returns dictionary where key is line number and value is array of AssignedVehicles with that line property
    // this heavy work must to be done in back-end
    getVehiclesByLines: async(): Promise<VehicleDictionaryLine> => {

        const response = await fetch('src/data/db.json');
        const vehiclesData = await response.json();
        /*
            id - Ieraksta identifikators;                            
            numurs - norīkotās līnijas numurs;
            rn - transportlīdzekļa numurs;
            datums - datums, kad norīkots līnijā;
            s_datums - datums, kad pabeigta tehniskā apskate un TL ir izbraucis no TA laukuma.
        */
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
        
        const outputDict: VehicleDictionaryLine = {};

        for (const line of lines)
            outputDict[line] = vehicles.filter((vehicle: AssignedVehicle) => { return vehicle.assignedLineNumber === line; }).sort((x: AssignedVehicle, y: AssignedVehicle) => { return x.id - y.id; });

        return outputDict;
    }
}


export default vehicleService;