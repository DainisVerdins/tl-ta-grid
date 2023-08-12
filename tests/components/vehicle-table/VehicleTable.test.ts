import VehicleTable from '../../../src/components/vehicle-table/VehicleTable.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { VehicleLine } from '../../../src/interfaces/vehicle-line';
import { AssignedVehicle } from '../../../src/interfaces/assigned-vehicle';
import vehicleService from '../../../src/services/vehicle-service';


const vehicleToDelete: AssignedVehicle = {
  id: 1,
  assignedLineNumber: 11,
  vehicleNumber: '11string;',
  assignedToLineDate: '2020-08-15T00:00:00',
  technicalInspectionCopleteDate: '2020-08-16T00:00:00',
};
const vehiclesLinesFromDB: VehicleLine[] = [
  {
    lineNumber: 1,
    vehicles: [
      vehicleToDelete,
      {
        id: 2,
        assignedLineNumber: 22,
        vehicleNumber: '22string;',
        assignedToLineDate: '2020-08-09T00:00:00',
        technicalInspectionCopleteDate: '2020-08-12T00:00:00',
      },
    ] as AssignedVehicle[],
  },
  {
    lineNumber: 2,
    vehicles: [
      {
        id: 3,
        assignedLineNumber: 33,
        vehicleNumber: 'string;',
        assignedToLineDate: '2020-08-09T00:00:00',
        technicalInspectionCopleteDate: null,
      },
      {
        id: 4,
        assignedLineNumber: 44,
        vehicleNumber: '44string;',
        assignedToLineDate: '2020-08-09T00:00:00',
        technicalInspectionCopleteDate: '2020-08-13T00:00:00',
      },
    ] as AssignedVehicle[],
  },
];

vi.spyOn(vehicleService, 'getVehiclesByLines').mockResolvedValue(
  vehiclesLinesFromDB
);

vi.spyOn(vehicleService, 'removeVehicleById').mockResolvedValue();

const wrapper = shallowMount(VehicleTable, {
  props: {
    filterDate: '2020-08-10T00:00:00',
  },
  global: {
    stubs: ['b-spinner'],
  },
});

describe('VehicleTable.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('removeVehicle() calls vehicle service to remove vehicle', () => {
    wrapper.vm.removeVehicle(vehicleToDelete);
    expect(vehicleService.removeVehicleById).toHaveBeenCalledTimes(1);
  });
});
