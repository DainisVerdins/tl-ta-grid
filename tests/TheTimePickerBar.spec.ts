import TheTimePickerBar from "../src/components/timepicker-bar/TheTimePickerBar.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, it, vi, expect } from "vitest";
const wrapper = shallowMount(TheTimePickerBar, {
  global: {
    stubs: ["b-button"],
  },
});

describe("The Time Picker Bar", () => {
  it("is a vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("does not emit anything if  time is 00:00:00", () => {
    wrapper.vm.time = { hours: 0, minutes: 0, seconds: 0 };
    wrapper.vm.emitSelectedDate();
    expect(wrapper.emitted("selected-date")).toBeFalsy();
  });
  it("does  emit if isDateSet() returns true", () => {
    wrapper.vm.time = { hours: 1, minutes: 1, seconds: 1 };

    wrapper.vm.emitSelectedDate();
    expect(wrapper.emitted()).toHaveProperty("selectedDate");
  });
});
