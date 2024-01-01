import { ThemeProvider, BaseStyles, SelectPanel } from "@primer/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <SelectPanel />
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
