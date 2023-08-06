import TheCell from '../../../src/components/cell/TheCell.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const wrapper = shallowMount(TheCell);

describe('TheCell.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('if prop label have string display it in component', async () => {
    const labelText: string = 'my title';
    await wrapper.setProps({label: labelText });

    expect(wrapper.html()).toContain(labelText);
  });

  it('if prop label was not used the component should not contain label text', async () => {
    const labelText: string = 'my title';
    await wrapper.setProps({label: null });

    expect(wrapper.html()).not.toContain(labelText);
  });

  it('default cell height is "md"', () => {
    expect(wrapper.vm.$props.cellHeight).toBe('md');
  });
});
