
import { describe, it, expect } from "vitest";
import { useDate } from "../../src/composables/useDate";

const { date, time, isValidDate, isValidTime, isDateSet } = useDate();
describe("useDate Composable", () => {
  it("if time is not set isDateSet will return false", () => {
    time.value = { hours: 0, minutes: 0, seconds: 0 };
    expect(isDateSet()).toBeFalsy();
  });
  it("if time is not set isDateSet will set isValidTime to false", () => {
    time.value = { hours: 0, minutes: 0, seconds: 0 };
    expect(isValidTime.value).toBeFalsy();
  });
  it("if time is set isDateSet will return true", () => {
    time.value = { hours: 1, minutes: 1, seconds: 1 };
    expect(isDateSet()).toBeTruthy();
  });
  it("if time is set isDateSet isValidTime is undefined", () => {
    time.value = { hours: 1, minutes: 1, seconds: 1 };
    expect(isValidTime.value).toBe(undefined);
  });
  it("if time is set isDateSet isValidDate is undefined", () => {
    time.value = { hours: 1, minutes: 1, seconds: 1 };
    expect(isValidDate.value).toBe(undefined);
  });
  it("if time variable is set and isDateSet called the date variable should be updated to contain time from time variable", () => {
    const currentDate = new Date();
    time.value = { hours: 1, minutes: 1, seconds: 1 };
    date.value = currentDate;

    const updatedDate: Date = new Date(
      currentDate.setHours(
        time.value.hours,
        time.value.minutes,
        time.value.seconds
      )
    );
    isDateSet();

    expect(date.value.toString()).toBe(updatedDate.toString());
  });
});
