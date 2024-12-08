import { useEffect, useState } from "react";
import useCalendar from "../../lib/useCalendar";
import { useApi } from "../../shared/useApi";
import { dateOnlyEquals } from "../../utils/calendar";
import PibAvailabilityDropdown from "../../components/PibAvailabilityDropdown";
import PibCalendarWeekdays from "../../components/PibCalendarWeekdays";
import PibCalendarMonthControl from "../../components/PibCalendarMonthControl";
import PibPrimaryButton from '../../components/PibPrimaryButton';
import { useNavigate } from "react-router-dom";


function EditMediaAvailabilityCalendar() {
  async function save() {
    const payload = {
      availabilities: selectedDates,
      dateRange: {
        start: calendar.calendarStartDate,
        end: calendar.calendarEndDate
      }
    };
    await api.patch('media-availability', payload);
    navigate('/calendario/midia');
  }

  function toggle(date) {
    const selectedDate = selectedDates.find((selectedDate) =>
      dateOnlyEquals(selectedDate, date),
    );

    if (selectedDate) {
      const newSelectedDates = [...selectedDates];
      const selectedDateIndex = newSelectedDates.indexOf(selectedDate);
      newSelectedDates.splice(selectedDateIndex, 1);
      setSelectedDates(newSelectedDates);
      return;
    }
    setSelectedDates([date,...selectedDates])
  }

  async function loadAvailabilities() {
    if (!calendar.calendarStartDate || !calendar.calendarEndDate) return;
    if (calendar.calendarStartDate == 'Invalid Date' || calendar.calendarEndDate == 'Invalid Date') return;
    const start = formatForHttpParam(calendar.calendarStartDate);
    const end = formatForHttpParam(calendar.calendarEndDate);
    const queryParams = `?start=${start}&end=${end}`;
    const {data} = await api.get('media-availability' + queryParams);
    setSelectedDates(data.map(i => new Date(i.date)));
  }

  function formatForHttpParam(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function isSelected(date) {
    const isSelected = selectedDates.some((selectedDate) =>
      dateOnlyEquals(selectedDate, date),
    );
    return isSelected;
  }
  
  const api = useApi();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const calendar = useCalendar(() => new Date());

  useEffect(() => {
    loadAvailabilities();
  }, [calendar.calendarStartDate]);

  return(
    <div className="shadow-lg rounded-xl bg-white p-5 mt-2 mx-auto p-5 max-w-xl">
      <div className="mb-8 w-20">
        <PibPrimaryButton onClick={save}>Salvar</PibPrimaryButton>
      </div>
      <PibCalendarMonthControl onPrevious={() => calendar.previous()} onNext={calendar.next}  nameOfMonth={calendar.nameOfMonth()} year={calendar.year()}/>
      <PibCalendarWeekdays/>
      <div
        className="flex flex-wrap mt-3 text-sm font-medium text-center text-primary-pressed"
      >
        
      {calendar.dates?.map(date => {
        return (
          <div onClick={() => toggle(date)} className="h-10 p-1 cursor-pointer group w-[14%]">
            <div className="flex items-center justify-center">
              {isSelected(date) ?
                (
                  <div className="rounded-full w-8 h-8 flex items-center justify-center bg-green-200 group-hover:bg-green-300">
                    <div>{date.getDate()}</div>
                  </div>
                )
              :(
                <div className="rounded-full w-8 h-8 flex items-center justify-center">
                    <div>{date.getDate()}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default EditMediaAvailabilityCalendar;