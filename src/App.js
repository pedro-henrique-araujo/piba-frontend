import { ThemeProvider, BaseStyles } from "@primer/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import Header from "./shared/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="197419869969-9n5carqvk5rlavebv124kq0u9qr4fe9b.apps.googleusercontent.com">
        <ThemeProvider>
          <BaseStyles>
            <Header />
            <RouterProvider router={router} />
          </BaseStyles>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
