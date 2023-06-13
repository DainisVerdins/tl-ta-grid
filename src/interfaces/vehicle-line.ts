import { AssignedVehicle } from './assigned-vehicle';

export interface VehicleLine {
    lineNumber: number;
    vehicles: AssignedVehicle[];
}