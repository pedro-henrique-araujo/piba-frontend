import { useState, useEffect } from "react";
import months from "./months.json";
import {
  getDates,
  getLastDayOfMonth,
  getLastSundayBasedOn,
  getNextSaturdayBasedOn,
} from "../utils/calendar";


function useCalendar(getToday) {
  function refresh() {
    loadDatesToRender();
    loadDates();
  }

  function loadDatesToRender() {
    if (!currentMonth) {
      const today = getToday();
      if (today.getDate() >= 15) {
        today.setMonth(today.getMonth() + 1)
      }
      today.setDate(1);
      setCurrentMonth(today);
      loadDateToRender(today);
      return;
    }
    loadDateToRender(currentMonth);
  }

  function loadDateToRender(month) {
    const date = new Date(
      month.getFullYear(),
      month.getMonth(),
      month.getDate(),
    );
    setDateToRender(date);
  }

  function loadDates() {
    const newFirstDayOfTheMonth = new Date(dateToRender);
    const newLastDayOfTheMonth = getLastDayOfMonth(newFirstDayOfTheMonth);
    const newCalendarStartDate = getLastSundayBasedOn(newFirstDayOfTheMonth);
    const newCalendarEndDate = getNextSaturdayBasedOn(newLastDayOfTheMonth);
    setFirstDayOfTheMonth(newFirstDayOfTheMonth);
    setLastDayOfTheMonth(newLastDayOfTheMonth);
    setCalendarStartDate(newCalendarStartDate)
    setCalendarEndDate(newCalendarEndDate);
    setDates(getDates(newCalendarStartDate, newCalendarEndDate));
  }

  function next() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(new Date(currentMonth));
    refresh();
  }

  function previous() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(new Date(currentMonth));
    refresh();
  }

  function nameOfMonth() {
    if (!currentMonth) return "";
    return months[currentMonth.getMonth()];
  }

  function year() {
    if (!currentMonth) return "";
    return currentMonth.getFullYear();
  } 

  const [currentMonth, setCurrentMonth] = useState();
  const [dateToRender, setDateToRender] = useState();
  const [dates, setDates] = useState();
  const [calendarStartDate, setCalendarStartDate] = useState();
  const [calendarEndDate, setCalendarEndDate] = useState();
  const [firstDayOfMonth, setFirstDayOfTheMonth] = useState();
  const [lastDayOfMonth, setLastDayOfTheMonth] = useState();

  useEffect(refresh, [currentMonth]);
  useEffect(refresh, []);

  return {
    dates,
    calendarStartDate,
    calendarEndDate,
    firstDayOfMonth,
    lastDayOfMonth,
    next,
    previous,
    nameOfMonth,
    year
  }
}

export default useCalendar;