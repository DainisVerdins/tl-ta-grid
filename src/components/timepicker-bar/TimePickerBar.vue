<template>
  <div class="time-picker-bar d-flex justify-content-center">
    <div class="time-picker-actions p-2">
      <div class="row align-items-end">
        <div class="col">
          <label>Datums:</label>
          <VueDatePicker
            v-model="date"
            :locale=locale
            :cancelText="cancelText"
            :selectText="selectText"
            :enable-time-picker="false"
            auto-apply
            :placeholder="placeholderText('datumu')"
            required
            :format=dateFormat
            :state="isValidDate"
          />
        </div>
        <div class="col">
          <label>Laiks:</label>
          <VueDatePicker
            v-model="time"
            :locale=locale
            :cancelText="cancelText"
            :selectText="selectText"
            :input-format=timeFormat
            time-picker
            enable-seconds
            :placeholder="placeholderText('laiku')"
            required
            :state="isValidTime"
          />
        </div>
        <div class="col">
          <b-button
            @click="filter"
            variant="primary"
            class="btn-max-width"
          >
            Parādīt
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import { defineComponent } from 'vue'
import { constants } from '@src/constants/constants';

export default defineComponent({
  components: { VueDatePicker },
  emits: ['date'],

  data() {
    return {
      date: null,
      time: null,
      isValidDate: undefined as undefined | boolean,
      isValidTime: undefined as undefined | boolean,
    };
  },

  computed: {
    locale(): string {
      return constants.LOCALE;
    },
    timeFormat(): string {
      return constants.TIME_FORMAT;
    },
    dateFormat(): string {
      return constants.DATE_FORMAT;
    },

    cancelText(): string {
      return 'Atcelt';
    },
    
    selectText(): string {
      return 'Izvēlēties';
    },
  },
  methods: {
    placeholderText(choseWhat: string): string {
      return `Izvēlies ${choseWhat}`;
    },

    filter(): void {
      if(!this.date) {
        this.isValidDate = false;
        return;
      }
      if(!this.time) {
        this.isValidTime = false;
        return;
      }

      this.isValidTime = undefined;
      this.isValidDate = undefined;

      const newTime = new Date(this.date);
      newTime.setHours(this.time['hours'], this.time['minutes'], this.time['seconds']);

      this.$emit('date', newTime.toString());
    }
  },
  watch: {
    time(newTime) {
      if(newTime)
        this.isValidTime = true;
    },
    date(newDate) {
      if(newDate)
        this.isValidDate = true;
    }
  }
})
</script>
  
<style scoped lang="scss">
.time-picker-bar {
  margin: 20px;
  border: 1px solid green;

  .time-picker-actions {
    border: 10px solid pink;
    border-radius: 1.5rem;
  }

  .btn-max-width {
    width: 100%;
  }
}
</style>
  