import { ThemeProvider, BaseStyles } from "@primer/react";
import SearchSelect from "./components/SearchSelect";

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <SearchSelect />
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
