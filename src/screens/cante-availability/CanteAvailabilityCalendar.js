import { useEffect, useState } from "react";
import useCalendar from "../../lib/useCalendar";
import { useApi } from "../../shared/useApi";
import { dateOnlyEquals } from "../../utils/calendar";
import PibAvailabilityDropdown from "../../components/PibAvailabilityDropdown";
import PibCalendarWeekdays from "../../components/PibCalendarWeekdays";
import PibCalendarMonthControl from "../../components/PibCalendarMonthControl";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import PibBlankButton from "../../components/PibBlankButton";
import { useNavigate } from "react-router-dom";
import PibGoogleLogin from "../../components/PibGoogleLogin";
import { useAuth } from "../../AuthProvider";
import useValidateToken from "../../shared/useValidateToken";
import PibLoading from "../../components/PibLoading";

function CanteAvailabilityCalendar() {
  async function handleLoginSuccess(response) {
    const { data } = await api.get("google-login/cante", {
      headers: {
        Authorization: response.credential,
      },
    });

    setToken(data.token);
  }

  function handleLoginError() {
    window.alert("Não foi possível fazer o login");
  }

  function getAvailabilitiesFor(date) {
    const filteredAvailabilities = availabilities.filter((a) =>
      dateOnlyEquals(new Date(a.date), date),
    );
    return filteredAvailabilities;
  }

  async function loadAvailabilities() {
    setIsLoading(true);
    if (!calendar.calendarStartDate || !calendar.calendarEndDate) return;
    if (
      calendar.calendarStartDate == "Invalid Date" ||
      calendar.calendarEndDate == "Invalid Date"
    )
      return;
    const start = formatForHttpParam(calendar.calendarStartDate);
    const end = formatForHttpParam(calendar.calendarEndDate);
    const queryParams = `?start=${start}&end=${end}`;

    const { data } = await api.get(
      "cante-availability" + (isAdmin() ? "" : "/mine") + queryParams,
    );
    setAvailabilities(data);

    setSelectedDates(data.map((i) => new Date(i.date)));

    setIsLoading(false);
  }

  function formatForHttpParam(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function edit() {
    navigate("/calendario/cante/editar");
  }

  function isSelected(date) {
    const isSelected = selectedDates.some((selectedDate) =>
      dateOnlyEquals(selectedDate, date),
    );
    return isSelected;
  }

  function isAdmin() {
    return includesAnyRoles("admin");
  }

  const api = useApi();
  const [selectedDates, setSelectedDates] = useState([]);

  const [availabilities, setAvailabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken, includesAnyRoles, clearToken } = useAuth();
  const validateToken = useValidateToken();
  const navigate = useNavigate();
  const calendar = useCalendar(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  useEffect(() => {
    validateToken();
  }, []);

  useEffect(() => {
    if (!token) return;
    loadAvailabilities();
  }, [calendar.calendarStartDate, token]);

  if (!token) {
    return (
      <div className="shadow-lg rounded-xl bg-white p-5 mt-2 mx-auto p-5 max-w-xl">
         <div className="my-8 text-xl text-center font-semibold">
            Faça login para ver o calendário
          </div>

        <div className="mb-5 flex justify-center">
          <PibGoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>        
      </div>
    );
  }
  

  const AdminView = calendar.dates?.map((date) => {
    const availabilitiesForDate = getAvailabilitiesFor(date);
    return (
      <div key={date} className="h-10 p-1 cursor-default group w-[14%]">
        <div className="flex items-center justify-center relative">
          <div className="group-hover:bg-gray-200 rounded-full w-8 h-8 relative overflow-visible flex items-center justify-center">
            {date.getMonth() === calendar.getMonth() ? (
              [0, 3, 6].includes(date.getDay()) ? (
                <div className="text-black font-bold">{date.getDate()}</div>
              ) : (
                <div className="text-gray-600">{date.getDate()}</div>
              )
            ) : (
              <div className="text-gray-300">{date.getDate()}</div>
            )}

            {availabilitiesForDate.length > 0 ? (
              <div className="bg-green-400 rounded-full text-[8px] text-white w-3 h-3 absolute top-0 right-0">
                <div className="flex items-center justify-center h-full">
                  <div>{availabilitiesForDate.length}</div>
                </div>
              </div>
            ) : null}
            <PibAvailabilityDropdown
              date={date}
              availabilities={availabilitiesForDate}
            />
          </div>
        </div>
      </div>
    );
  });

  const RegularCalendar = calendar.dates?.map((date) => {
    return (
      <div className="h-10 p-1 cursor-pointer group w-[14%]">
        <div className="flex items-center justify-center">
          {isSelected(date) ? (
            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-green-200 group-hover:bg-green-300">
              <div className="font-bold">{date.getDate()}</div>
            </div>
          ) : (
            <div className="rounded-full w-8 h-8 flex items-center justify-center">
              {date.getMonth() === calendar.getMonth() ? (
                [0, 3, 6].includes(date.getDay()) ? (
                  <div className="text-black font-bold">{date.getDate()}</div>
                ) : (
                  <div className="text-gray-600">{date.getDate()}</div>
                )
              ) : (
                <div className="text-gray-300">{date.getDate()}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="shadow-lg rounded-xl bg-white p-5 mt-2 mx-auto p-5 max-w-xl">
      <div className="w-12">
        <PibBlankButton onClick={()=> clearToken()}>Sair</PibBlankButton>
      </div>
      {isAdmin() ? (
        <div className="mb-8 w-52 mx-auto">
          <PibPrimaryButton onClick={edit}>
            Minha disponibilidade
          </PibPrimaryButton>
        </div>
      ) : (
        <>
         <div className="mb-8 w-32 mx-auto">
          <PibPrimaryButton onClick={edit}>Editar</PibPrimaryButton>
        
        </div>
          <div className="mb-8 text-center font-semibold">
            Você está vendo apenas a sua disponibilidade
          </div>
        </>
       
      )}

      {isLoading ? (
        <div className="w-full flex flex-col align-center items-center my-32">
          <PibLoading />
        </div>
      ) : (
        <>
          <PibCalendarMonthControl
            onPrevious={() => calendar.previous()}
            onNext={calendar.next}
            nameOfMonth={calendar.nameOfMonth()}
            year={calendar.year()}
          />
          <PibCalendarWeekdays />
          <div className="flex flex-wrap mt-3 text-sm font-medium text-center text-primary-pressed">
            {isAdmin() ? AdminView : RegularCalendar}
          </div>
        </>
      )}
    </div>
  );
}

export default CanteAvailabilityCalendar;
