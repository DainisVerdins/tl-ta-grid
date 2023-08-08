import TableCell from '../../../src/components/vehicle-table/TableCell.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AssignedVehicle } from '../../../src/interfaces/assigned-vehicle';
const wrapper = shallowMount(TableCell, {
    global: {
        directives: {
            'b-tooltip': (msg) => msg
          }
    },
    props: {
        label: 'something'
    },
  });

describe('TableCell.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('clickedVehicle() emits value if prop vehicle contains value  ',async () => {
    await wrapper.setProps({vehicle: {} as AssignedVehicle });
    //@ts-ignore
    wrapper.vm.clickedVehicle();
    
    expect(wrapper.emitted()).toHaveProperty('clickedVehicle');
  });

  it('component contains "clickable" style if clickableStyle() returns "clickable"', async () => {
    await wrapper.setProps({emptyCell: false, canBeDeleted: false});

    expect(wrapper.classes()).toContain('clickable');
  });

  it('component does not contain "clickable" style if emptyCell prop is true', async () => {
    await wrapper.setProps({emptyCell: true});
    
    expect(wrapper.classes()).not.toContain('clickable');
  });

  it('component does not contain "clickable" style if canBeDeleted prop is true', async () => {
    await wrapper.setProps({ canBeDeleted: true });
    
    expect(wrapper.classes()).not.toContain('clickable');
  });
});
