import { ThemeProvider, BaseStyles } from "@primer/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <RouterProvider router={router} />
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
