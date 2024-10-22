import { GoogleLogin } from "@react-oauth/google";

function PibGoogleLogin({
    onSuccess,
    onError
}) {
    return <GoogleLogin onSuccess={onSuccess} onError={onError} />
}

export default PibGoogleLogin;