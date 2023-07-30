<template>
    <div class="time-picker-bar d-flex justify-content-center">
        <div class="time-picker-actions p-2">
            <div class="row align-items-end">
                <div class="col">
                    <label>Datums:</label>
                    <VueDatePicker v-model="date" :locale="locale()" :cancelText="cancelText()" :selectText="selectText()"
                        :enable-time-picker="false" auto-apply :placeholder="placeholderText('datumu')" required
                        :format="dateFormat()" :state="isValidDate" />
                </div>
                <div class="col">
                    <label>Laiks:</label>
                    <VueDatePicker v-model="time" :locale="locale()" :cancelText="cancelText()" :selectText="selectText()"
                        :input-format="timeFormat()" time-picker enable-seconds :placeholder="placeholderText('laiku')" required
                        :state="isValidTime" />
                </div>
                <div class="col">
                    <b-button @click="emitSelectedDate" variant="primary" class="btn-max-width">
                        Parādīt
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}
import { Ref, ref } from 'vue';

import { constants } from '@src/constants/constants';

import VueDatePicker from '@vuepic/vue-datepicker';

const emit = defineEmits<{
    selectedDate: [date: string]
}>();

// TODO: if date provided it auto sets to current date, maybe better to user
// chose preferred date not force him to start for current date?
// same problem with time
const date = ref(new Date());
const time: Ref<Time> = ref({ hours: 0, minutes: 0, seconds: 0 });
const isValidDate: Ref<undefined | boolean> = ref(undefined);
const isValidTime: Ref<undefined | boolean> = ref(undefined);

const cancelText = ((): string => {
    return 'Atcelt';
});
const selectText = ((): string => {
    return 'Izvēlēties';
});
const placeholderText = ((choseWhat: string): string => {
    return `Izvēlies ${choseWhat}`;
});
// TODO: probably need to use compose and move this logic somewhere
const locale = ((): string => {
    return constants.LOCALE;
});
const timeFormat = ((): string => {
    return constants.TIME_FORMAT;
});
const dateFormat = ((): string => {
    return constants.DATE_FORMAT;
});

const emitSelectedDate = ((): void => {
    if(!date.value) {
        isValidDate.value = false;
        return;
      }
      if(!time.value) {
        isValidTime.value = false;
        return;
      }

      isValidTime.value = undefined;
      isValidDate.value = undefined;
      
      date.value.setHours(time.value.hours, time.value.minutes, time.value.seconds);
      emit('selectedDate',  date.value.toString());
});
</script>

<style scoped lang="scss">
@import '@src/styles/variables';

.time-picker-bar {
    margin: $margin-normal;

    .time-picker-actions {
        border: $border-size solid pink;
        border-radius: $border-radius;
        background-color: #fff;
    }

    .btn-max-width {
        width: 100%;
    }
}
</style>