import { Ref, ref } from "vue";

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useDate() {
  const date = ref(new Date());
  const time: Ref<Time> = ref({ hours: 0, minutes: 0, seconds: 0 });
  const isValidDate: Ref<undefined | boolean> = ref(undefined);
  const isValidTime: Ref<undefined | boolean> = ref(undefined);

  const isDateSet = (): boolean => {
    if (!time.value.hours) {
      isValidTime.value = false;

      return false;
    }

    isValidTime.value = undefined;
    isValidDate.value = undefined;

    date.value.setHours(
      time.value.hours,
      time.value.minutes,
      time.value.seconds
    );

    return true;
  };

  return { date, time, isValidDate, isValidTime, isDateSet };
}
