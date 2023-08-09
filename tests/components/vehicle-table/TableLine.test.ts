import TableLine from '../../../src/components/vehicle-table/TableLine.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AssignedVehicle } from '../../../src/interfaces/assigned-vehicle';


const componentStubs = ['b-button', 'b-modal'];

const wrapper = shallowMount(TableLine, {
    props: {
        lineNumber: '1',
        vehicles: [] as AssignedVehicle[]
    },
    global: {
      stubs: componentStubs,
    },
  });

describe('TableLine.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('onDeleteVehicle() emits property "remove"', () => {
    wrapper.vm.deleteVehicle();
    
    expect(wrapper.emitted()).toHaveProperty('remove');
  });

  it('canDeleteVehicle() returns "true" if vehicle property "technicalInspectionCopleteDate" is not null', () => {
    const vehicle: AssignedVehicle = {
      id: 123,
      assignedLineNumber: 123,
      vehicleNumber: 'ABC',
      assignedToLineDate: '1',
      technicalInspectionCopleteDate:'2022-08-09'
    };
    
    expect(wrapper.vm.canDeleteVehicle(vehicle)).toBeTruthy();
  });

  it('canDeleteVehicle() returns "false" if vehicle property "technicalInspectionCopleteDate" is null', () => {
    const vehicle: AssignedVehicle = {
      id: 123,
      assignedLineNumber: 123,
      vehicleNumber: 'ABC',
      assignedToLineDate: '1',
      technicalInspectionCopleteDate: null
    };
    
    expect(wrapper.vm.canDeleteVehicle(vehicle)).toBeFalsy();
  });

  it('isLastEmptyCell() returns true if prop cellAmount === passed argument of function', () => {
    const cellAmountInRow: number = 14;
    const amountOfVehicles: number = 12;
    let stubVehicles: AssignedVehicle[] = [];

    for (let index = 0; index <amountOfVehicles; index++)
      stubVehicles.push({} as AssignedVehicle);

      const localWrapper = shallowMount(TableLine, {
        propsData: {
          cellAmount: cellAmountInRow,
          vehicles: stubVehicles,
          lastLine: false,
          lineNumber: '1'
        },
        global: {
          stubs: componentStubs,
        }
      });

    expect(localWrapper.vm.isLastEmptyCell(cellAmountInRow - amountOfVehicles)).toBeTruthy();
  });

  it('isLastFilledCell() returns true if props.cellAmount === passed argument of function', async () => {
    const cellAmountExpected: number = 12;
    const localWrapper = shallowMount(TableLine, {
      propsData: {
        cellAmount: cellAmountExpected,
        vehicles: [] as AssignedVehicle[],
        lastLine: false,
        lineNumber: '1'
      },
      global: {
        stubs: componentStubs,
      }
    });

    expect(localWrapper.vm.isLastFilledCell(cellAmountExpected)).toBeTruthy();
  });
});
