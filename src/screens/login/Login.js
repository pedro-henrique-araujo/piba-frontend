import PibGoogleLogin from "../../components/PibGoogleLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { useApi } from "../../shared/useApi";

function Login() {
  async function handleLoginSuccess(response) {
    const { data } = await api.get("google-login", {
      headers: {
        Authorization: response.credential,
      },
    });

    setToken(data.token);
    navigate("/menu");
  }

  function handleLoginError() {
    window.alert("Não foi possível fazer o login");
  }

  const navigate = useNavigate();
  const { setToken } = useAuth();
  const api = useApi();

  return (
    <div className="mx-auto p-5 max-w-xl flex justify-center">
      <PibGoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
}

export default Login;
