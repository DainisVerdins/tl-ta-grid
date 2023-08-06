import HeaderCell from '../../../src/components/vehicle-table/HeaderCell.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const wrapper = shallowMount(HeaderCell);

describe('HeaderCell.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('firstCell prop adds "first-header-table-cell" class to component', async () => {
    await wrapper.setProps({label: 'tmp', firstCell: true });
    
    expect(wrapper.classes()).toContain('first-header-table-cell');
  });

  it('lastCell prop adds "last-table-cell" class to component', async () => {
    await wrapper.setProps({label: 'tmp', lastCell: true });

    expect(wrapper.classes()).toContain('last-table-cell');
  });
});
