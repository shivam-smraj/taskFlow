import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(user.role === 'Admin' ? '/admin' : '/employee');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await login(email, password);
        setLoading(false);
        if (res.success) {
            navigate(res.role === 'Admin' ? '/admin' : '/employee');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <div className="auth-logo">
                    <div className="auth-logo-icon">⚡</div>
                </div>
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your TaskFlow account</p>

                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            id="login-email"
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-gradient btn-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    Don&apos;t have an account?{' '}
                    <Link to="/register">Register here</Link>
                    <br />
                    <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
