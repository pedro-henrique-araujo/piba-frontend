import { useAuth } from "../AuthProvider";
import Login from "../screens/login/Login";
import NewSchoolAttendance from "../screens/school-attendance/NewSchoolAttendance";
import SchoolAttendanceSuccessfullyCreated from "../screens/school-attendance/SchoolAttendanceSuccessfullyCreated";
import ListSessionAttendance from '../screens/session-attendance/ListSessionAttendance';
import NewSessionAttendance from "../screens/session-attendance/NewSessionAttendance";
import { createBrowserRouter, redirect } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    loader() {
      if (!localStorage.getItem('token')) {
        return redirect('/');
      }
      return null;
    },
    children: [
      {
        path: "/frequencia/sessao",
        element: <ListSessionAttendance />
      },
      {
        path: "frequencia/sessao/nova", 
        element: <NewSessionAttendance/>
      }

    ]
  }
]);

export default router;
