import { ThemeProvider, BaseStyles } from "@primer/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Header from "./shared/Header";

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Header />
        <RouterProvider router={router} />
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
