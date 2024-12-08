import {
  getDates,
  getLastDayOfMonth,
  getLastSundayBasedOn,
  getNextSaturdayBasedOn,
} from "../utils/calendar";

import months from "./months.json";

export class Calendar {
  constructor(getToday) {
    this.getToday = getToday;
  }

  refresh() {
    this.loadDatesToRender();
    this.loadDates();
    this.afterRefresh();
  }

  loadDatesToRender() {
    if (!this.currentMonth) {
      this.currentMonth = this.getToday();
      if (this.currentMonth.getDate() >= 15) {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      }
      this.currentMonth.setDate(1);
    }
    this.dateToRender = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      this.currentMonth.getDate(),
    );
  }

  afterRefresh() {}

  loadDates() {
    this.firstDayOfMonth = new Date(this.dateToRender);
    this.lastDayOfMonth = getLastDayOfMonth(this.firstDayOfMonth);
    this.calendarStartDate = getLastSundayBasedOn(this.firstDayOfMonth);
    this.calendarEndDate = getNextSaturdayBasedOn(this.lastDayOfMonth);
    this.dates = getDates(this.calendarStartDate, this.calendarEndDate);
  }

  previous() {
    this.currentMonth?.setMonth(this.currentMonth.getMonth() - 1);
    this.refresh();
  }

  next() {
    this.currentMonth?.setMonth(this.currentMonth.getMonth() + 1);
    this.refresh();
  }

  nameOfMonth() {
    if (this.currentMonth) {
      return months[this.currentMonth?.getMonth()];
    }
    return "";
  }

  year() {
    if (this.currentMonth) {
      return this.currentMonth.getFullYear();
    }
    return "";
  }

  getEndDate() {
    return this.calendarEndDate;
  }

  getStartDate() {
    return this.calendarStartDate;
  }

  getAvailabilitySubject() {
    return this.availabilitySubject;
  }

  getDates() {
    return this.dates;
  }
}
