
import TheTimePickerBar from '../src/components/timepicker-bar/TheTimePickerBar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { mount, shallowMount } from "@vue/test-utils";
import { assert, describe, it, vi, expect } from 'vitest';

const wrapper = shallowMount(TheTimePickerBar);

describe.only("The Time Picker Bar", () => {
    it("is a vue instance", () => {
       // const wrapper = shallowMount(TheTimePickerBar);
        expect(wrapper.exists()).toBeTruthy();
      });
    it("does not emit time if emitSelectedDate() was launch", () => {
        //const wrapper = shallowMount(TheTimePickerBar);
        //console.log(wrapper.vm.isDateSet())
        wrapper.vm.emitSelectedDate();
        expect(wrapper.emitted('selected-date')).toBeFalsy();
    });
    // FIXME: unit test is not working
    it.only("does  emit if isDateSet() returns true", () => {    
      wrapper.vm.useDate = vi.fn().mockReturnValue(true);
        wrapper.vm.emitSelectedDate();

        expect(wrapper.emitted('selected-date')).toBe(true);
    });
  });