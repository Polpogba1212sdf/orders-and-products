<template>
  <div class="wrapper w-100 fw-bold d-flex align-items-center">
    <div class="timeLogoWrapper d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <img src="../assets/logo.png" alt="logo" />
        <span class="logoText">INVENTORY</span>
      </div>
      <div class="d-flex align-items-center">
        <input type="text" placeholder="Search" class="fw-bold" />
      </div>
      <div class="date">
        <span>{{ dayOfWeek }}</span>
        <div v-if="date">
          <span class="localeDate">{{ localeDate }}</span>
          <img src="../assets/time.png" alt="time" />
          <span class="localeTime">{{ localeTime }}</span>
        </div>
        <div v-else>
          <span>...Loading</span>
        </div>
      </div>
      <div>
        <span>Sessions Counter</span>
        <div class="sessionsCounter">
          <span>{{ sessionsCounter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from "@/services/socketio.service";
import { months } from "@/data/months";
export default {
  data: () => ({
    date: 0,
    sessionsCounter: 0,
  }),
  computed: {
    newDate() {
      return new Date(this.date);
    },
    localeDate() {
      return (
        this.newDate.getDate() +
        " " +
        this.currentMonth +
        ", " +
        this.newDate.getFullYear()
      );
    },
    localeTime() {
      return this.newDate.toLocaleTimeString().slice(0, 5);
    },
    dayOfWeek() {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek[this.newDate.getDay()];
    },
    currentMonth() {
      return months[this.newDate.getMonth()];
    },
  },
  created() {
    this.intervalId = setInterval(() => (this.date = Date.now()), 1000);
    SocketioService.setupSocketConnection();
    SocketioService.socket.on("sessionsCounter", (data) => {
      this.sessionsCounter = data;
    });
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
    SocketioService.disconnect();
  },
};
</script>

<style scoped>
.wrapper {
  box-shadow: 0 13px 12px #f0f3f5;
  height: 70px;
  font-size: 12px;
}
.wrapper .timeLogoWrapper {
  width: 1569px;
  margin-left: 200px;
}
.wrapper .logoText {
  margin-left: 20px;
  color: #7cb342;
}
.wrapper input {
  width: 410px;
  margin-left: 150px;
  color: #2c3c44;
  border-radius: 5px;
  height: 28px;
  font-size: 13px;
  padding-top: 4px;
  padding-left: 14px;
}
.wrapper .date {
  color: #4c585e;
  text-align: left;
  margin-left: 560px;
}
.wrapper .date .localeDate {
  margin-right: 19px;
}
.wrapper .date .localeTime {
  margin-left: 10px;
}
</style>
