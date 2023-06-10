import { AssignedVehicle } from '@src/interfaces/assigned-vehicle';

const vehicleService = {
    getVehicles: async (): Promise<AssignedVehicle[]> => {
        const response = await fetch('src/data/db.json');
        const vehiclesData = await response.json();
        /*
            id - Ieraksta identifikators;                            
            numurs - norīkotās līnijas numurs;
            rn - transportlīdzekļa numurs;
            datums - datums, kad norīkots līnijā;
            s_datums - datums, kad pabeigta tehniskā apskate un TL ir izbraucis no TA laukuma.
        */
        let output: AssignedVehicle[] = [];
        for (const item of vehiclesData.items) {
            output.push({
                id: item.id,
                assignedLineNumber: item.numurs,
                vehicleNumber: item.rn,
                assignedToLineDate: item.datums,
                technicalInspectionCopleteDate: item.s_datums,
            } as AssignedVehicle);
        }
        return output;
    }
}
export default vehicleService;