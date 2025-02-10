import { useState, useEffect } from "react";
import months from "./months.json";
import {
  getDates,
  getLastDayOfMonth,
  getLastSundayBasedOn,
  getNextSaturdayBasedOn,
} from "../utils/calendar";

function useCalendar(getToday) {
  console.log(getToday);
  function refresh(date) {
    loadDates(loadDatesToRender(date));
  }

  function loadDatesToRender(date) {
    if (!date) {
      const today = getToday();
      if (today.getDate() >= 15) {
        today.setMonth(today.getMonth() + 1);
      }
      today.setDate(1);
      setCurrentMonth(today);
      return today;
    }
    return date;
  }

  function loadDates(date) {
    const newFirstDayOfTheMonth = new Date(date);
    const newLastDayOfTheMonth = getLastDayOfMonth(newFirstDayOfTheMonth);
    const newCalendarStartDate = getLastSundayBasedOn(newFirstDayOfTheMonth);
    const newCalendarEndDate = getNextSaturdayBasedOn(newLastDayOfTheMonth);
    setCalendarStartDate(newCalendarStartDate);
    setCalendarEndDate(newCalendarEndDate);
    setDates(getDates(newCalendarStartDate, newCalendarEndDate));
  }

  function next() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(new Date(currentMonth));
    refresh(currentMonth);
  }

  function previous() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(new Date(currentMonth));
    refresh(currentMonth);
  }

  function nameOfMonth() {
    if (!currentMonth) return "";
    return months[currentMonth.getMonth()];
  }

  function year() {
    if (!currentMonth) return "";
    return currentMonth.getFullYear();
  }

  function getMonth() {
    if (!currentMonth) return "";
    return currentMonth.getMonth();
  }

  const [currentMonth, setCurrentMonth] = useState();
  const [dates, setDates] = useState();
  const [calendarStartDate, setCalendarStartDate] = useState();
  const [calendarEndDate, setCalendarEndDate] = useState();

  useEffect(refresh, []);
  return {
    dates,
    calendarStartDate,
    calendarEndDate,
    next,
    previous,
    nameOfMonth,
    getMonth,
    year,
  };
}

export default useCalendar;
