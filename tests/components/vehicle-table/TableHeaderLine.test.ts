import TableHeaderLine from '../../../src/components/vehicle-table/TableHeaderLine.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

const wrapper = shallowMount(TableHeaderLine, {
    props: {
        label: 'label',
    },
  });

describe('TableHeaderLine.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('last cell in Line contains "last-header-cell" class', () => {
    expect(wrapper.html()).toContain('last-header-cell');
  });
});
