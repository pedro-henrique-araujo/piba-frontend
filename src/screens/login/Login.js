
import api from '../../services/api';
import PibGoogleLogin from '../../components/PibGoogleLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
    async function handleLoginSuccess(response) {
        const { data } = await api.get('google-login', {
            headers:
            {
                Authorization: response.credential,
            }
        });

        localStorage.setItem('token', data.token);
        navigate('/frequencia/sessao');
    }

    function handleLoginError() {
        window.alert("Não foi possível fazer o login");
    }

    const navigate = useNavigate();

    return (
        <div className="mx-auto p-5 max-w-xl flex justify-center">
            <PibGoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
    );
}

export default Login;