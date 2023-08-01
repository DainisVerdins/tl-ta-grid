
import TheTimePickerBar from '../src/components/timepicker-bar/TheTimePickerBar.vue';
import { mount, shallowMount } from "@vue/test-utils";
import { assert, describe, it, vi,expect } from 'vitest';


describe("The Time Picker Bar", () => {
    it("does not launch emit if time is 00::00::00 on click", () => {
        const wrapper = shallowMount(TheTimePickerBar);
        expect(wrapper.emitted('selected-date')).toBeFalsy();
    });
  });