import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess, onFailure }: { onSuccess: any; onFailure?: any }) => (
  <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
);

export default Login;
