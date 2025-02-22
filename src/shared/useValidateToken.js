import { useAuth } from "../AuthProvider";
import { useApi } from "./useApi";

function useValidateToken() {
  async function validateToken() {
    if (!token) return;
    const response = await api.get("validate-token");
    if (!response) setToken(null);
  }

  const { token, setToken } = useAuth();
  const api = useApi();

  return validateToken;
}

export default useValidateToken;
