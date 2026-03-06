import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    const features = [
        { icon: '🔐', title: 'Secure JWT Auth', desc: 'Token-based authentication keeps your data safe. Separate Admin and Employee roles with protected routes.' },
        { icon: '📋', title: 'Task Management', desc: 'Admins create, assign and track tasks. Employees receive notifications and manage their own work queue.' },
        { icon: '🔄', title: 'Real-time Status', desc: 'Update task statuses instantly — Pending, In Progress, or Completed. Everyone stays on the same page.' },
        { icon: '📊', title: 'Admin Overview', desc: 'A powerful dashboard gives admins a bird\'s-eye view of all tasks and team member progress.' },
        { icon: '👥', title: 'Employee Profiles', desc: 'Manage your whole team from one place. Assign tasks directly from the employee directory.' },
        { icon: '📱', title: 'Fully Responsive', desc: 'Looks great on every device — desktop, tablet, or smartphone. Work from anywhere.' },
    ];

    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-inner">
                    <span className="navbar-brand">⚡ TaskFlow</span>
                    <div className="navbar-actions">
                        {user ? (
                            <Link to={user.role === 'Admin' ? '/admin' : '/employee'} className="btn btn-gradient btn-sm">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                                <Link to="/register" className="btn btn-gradient btn-sm">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-content">
                    <div className="hero-badge">⚡ Modern Task Management</div>
                    <h1 className="hero-title">
                        Manage Tasks,
                        <br />
                        <span className="gradient-text">Empower Teams</span>
                    </h1>
                    <p className="hero-subtitle">
                        A full-stack task management system built on the MERN stack. Admins assign work, employees deliver. Simple, secure, and powerful.
                    </p>
                    <div className="hero-cta">
                        <Link to="/register" className="btn btn-gradient btn-lg">Get Started Free</Link>
                        <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <div className="features-inner">
                    <span className="section-tag">Features</span>
                    <h2 className="features-heading">Everything your team needs</h2>
                    <p className="features-desc">From task creation to completion tracking — TaskFlow has every step covered.</p>
                    <div className="features-grid">
                        {features.map((f) => (
                            <div key={f.title} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roles */}
            <section className="roles">
                <div className="roles-inner">
                    <span className="section-tag">Roles</span>
                    <h2 className="features-heading">Built for every role</h2>
                    <p className="features-desc">Two distinct dashboards tailored to how each role actually works.</p>
                    <div className="roles-grid">
                        <div className="role-card admin">
                            <div className="role-icon">🛡️</div>
                            <h3 className="role-title">Admin</h3>
                            <p className="role-subtitle">Full control over team and tasks</p>
                            <ul className="role-list">
                                <li>Create &amp; manage tasks</li>
                                <li>Assign tasks to employees</li>
                                <li>View all team members</li>
                                <li>Track overall task status</li>
                            </ul>
                        </div>
                        <div className="role-card employee">
                            <div className="role-icon">👤</div>
                            <h3 className="role-title">Employee</h3>
                            <p className="role-subtitle">Focused view of personal tasks</p>
                            <ul className="role-list">
                                <li>View only assigned tasks</li>
                                <li>Update task status live</li>
                                <li>Self-register with secure auth</li>
                                <li>Personal progress dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-banner">
                <div className="cta-banner-inner">
                    <h2 className="cta-banner-title">Ready to get organized?</h2>
                    <p className="cta-banner-desc">Join your team on TaskFlow and start managing work more effectively today.</p>
                    <div className="cta-banner-actions">
                        <Link to="/register" className="btn btn-gradient btn-lg">Start for Free</Link>
                        <Link to="/login" className="btn btn-outline btn-lg">Login Instead</Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <p>© 2026 TaskFlow — Built with ❤️ using the MERN Stack</p>
                <a
                    href="https://github.com/shivam-smraj/taskFlow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-github-link"
                >
                    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                        -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                        -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
                        .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                        .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                        0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    View on GitHub
                </a>
            </footer>
        </div>
    );
};

export default Home;
