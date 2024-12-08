import CanteAvailabilityCalendar from "../screens/cante-availability/CanteAvailabilityCalendar";
import EditCanteAvailabilityCalendar from "../screens/cante-availability/EditCanteAvailabilityCalendar";
import MediaAvailabilityCalendar from "../screens/media-availability/MediaAvailabilityCalendar";
import EditMediaAvailabilityCalendar from "../screens/media-availability/EditMediaAvailabilityCalendar";
import Login from "../screens/login/Login";
import NewSchoolAttendance from "../screens/school-attendance/NewSchoolAttendance";
import SchoolAttendanceSuccessfullyCreated from "../screens/school-attendance/SchoolAttendanceSuccessfullyCreated";
import { EditSessionAttendance } from "../screens/session-attendance/EditSessionAttendance";
import ListSessionAttendance from "../screens/session-attendance/ListSessionAttendance";
import NewSessionAttendance from "../screens/session-attendance/NewSessionAttendance";
import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <NewSchoolAttendance />,
  },
  {
    path: "/frequencia/eb",
    element: <NewSchoolAttendance />,
  },
  {
    path: "/frequencia/eb/sucesso",
    element: <SchoolAttendanceSuccessfullyCreated />,
  },
  {
    path: '/calendario/cante',
    element: <CanteAvailabilityCalendar/>
  },  
  {
    path: '/calendario/midia',
    element: <MediaAvailabilityCalendar/>
  },  
  {
    loader() {
      if (!localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/frequencia/sessao",
        element: <ListSessionAttendance />,
      },
      {
        path: "/frequencia/sessao/nova",
        element: <NewSessionAttendance />,
      },
      {
        path: "/frequencia/sessao/editar/:id",
        element: <EditSessionAttendance />,
      },
      {
        path: '/calendario/cante/editar',
        element: <EditCanteAvailabilityCalendar/>
      },
      {
        path: '/calendario/midia/editar',
        element: <EditMediaAvailabilityCalendar/>
      },
    ],
  },
]);

export default router;
