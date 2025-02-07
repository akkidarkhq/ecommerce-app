import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess: (response: any) => void;
  onLoginFailure?: (error?: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
  const { login } = useAuth();

  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login to Continue</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Email & Password Fields */}
            <form>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
              </div>
            </form>

            {/* Google Login */}
            <div className="text-center mt-3">
              <p>Or login with</p>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    login(credentialResponse.credential);
                  }
                }}
                onError={() => console.error('Login Failed')}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
