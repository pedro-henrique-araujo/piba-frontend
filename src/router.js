import NewSchoolAttendance from "./screens/school-attendance/NewSchoolAttendance";
import SchoolAttendanceSuccessfullyCreated from "./screens/school-attendance/SchoolAttendanceSuccessfullyCreated";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
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
]);

export default router;
