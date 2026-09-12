import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.scss';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext) || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email.trim(), password);

      if (result.success) {
        if (result.user?.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickFill = async () => {
    setEmail('admin@shoppymart.com');
    setPassword('admin123');
    setError('');
    setLoading(true);

    try {
      const result = await login('admin@shoppymart.com', 'admin123');
      if (result.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(result.error || 'Admin login failed. Ensure database seeder was executed.');
      }
    } catch (err) {
      setError('Error signing in as admin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          <div style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#f97316',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>Admin Demo Account:</strong><br />
              <code>admin@shoppymart.com</code> / <code>admin123</code>
            </div>
            <button
              type="button"
              onClick={handleAdminQuickFill}
              style={{
                background: '#f97316',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              Log in as Admin
            </button>
          </div>

          {location.state?.message && <div className="success-message">{location.state.message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading || !login}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">OR</div>

          <div className="social-login">
            <button className="social-btn google" type="button">
              <span>G</span> Google
            </button>
            <button className="social-btn facebook" type="button">
              <span>f</span> Facebook
            </button>
          </div>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
