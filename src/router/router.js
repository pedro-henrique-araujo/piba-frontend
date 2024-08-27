import Login from "../screens/login/Login";
import NewSchoolAttendance from "../screens/school-attendance/NewSchoolAttendance";
import SchoolAttendanceSuccessfullyCreated from "../screens/school-attendance/SchoolAttendanceSuccessfullyCreated";
import ListSessionAttendance from '../screens/session-attendance/ListSessionAttendance';

const { createBrowserRouter, redirect } = require("react-router-dom");

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
      }

    ]
  }
]);

export default router;
