import AttendanceSuccessfullyCreated from "./screens/attendance/AttendanceSuccessfullyCreated";

const { createBrowserRouter } = require("react-router-dom");
const {
  default: NewAttendance,
} = require("./screens/attendance/NewAttendance");

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewAttendance />,
  },

  {
    path: "/success",
    element: <AttendanceSuccessfullyCreated />,
  },
]);

export default router;
