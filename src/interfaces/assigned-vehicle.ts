export interface AssignedVehicle {
    id: number;
    assignedLineNumber: number;
    vehicleNumber: string;
    assignedToLineDate: string;
    technicalInspectionCopleteDate?: string | null;
}