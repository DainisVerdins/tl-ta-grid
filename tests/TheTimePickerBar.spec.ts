
import TheTimePickerBar from '../src/components/timepicker-bar/TheTimePickerBar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { mount, shallowMount } from "@vue/test-utils";
import { assert, describe, it, vi, expect } from 'vitest';

const wrapper = shallowMount(TheTimePickerBar);

describe("The Time Picker Bar", () => {
    it("is a vue instance", () => {
        const wrapper = shallowMount(TheTimePickerBar);
        expect(wrapper.exists()).toBeTruthy();
      });
    it("does not launch emit if time is 00::00::00 on click", () => {
        const wrapper = shallowMount(TheTimePickerBar);
        expect(wrapper.emitted('selected-date')).toBeFalsy();
    });
    it("does  emit if time is not 00::00::00 on click", () => {
        const wrapper = shallowMount(TheTimePickerBar);
    });
  });