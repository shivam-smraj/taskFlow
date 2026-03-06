import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => { fetchMyTasks(); }, []);

    const fetchMyTasks = async () => {
        try { const { data } = await api.get('/tasks/employee'); setTasks(data); } catch { }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.put(`/tasks/${taskId}/status`, { status: newStatus });
            fetchMyTasks();
        } catch { console.error('Failed to update task status'); }
    };

    const getStatusBadge = (status) => {
        if (status === 'Completed') return <span className="badge badge-completed">✓ Completed</span>;
        if (status === 'In Progress') return <span className="badge badge-progress">⟳ In Progress</span>;
        return <span className="badge badge-pending">◌ Pending</span>;
    };

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const pending = tasks.filter(t => t.status === 'Pending').length;

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="dashboard-header-inner">
                    <Link to="/" className="dashboard-brand">⚡ TaskFlow</Link>
                    <div className="dashboard-user">
                        <span className="user-welcome">Welcome, <span className="user-name">{user?.name}</span></span>
                        <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                {/* Stats */}
                <div className="stats-strip">
                    <div className="stat-card">
                        <span className="stat-label">My Tasks</span>
                        <span className="stat-value">{total}</span>
                        <span className="stat-sub">assigned to me</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Pending</span>
                        <span className="stat-value" style={{ color: '#fca5a5' }}>{pending}</span>
                        <span className="stat-sub">to start</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">In Progress</span>
                        <span className="stat-value" style={{ color: '#fcd34d' }}>{inProgress}</span>
                        <span className="stat-sub">ongoing</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Completed</span>
                        <span className="stat-value" style={{ color: '#6ee7b7' }}>{completed}</span>
                        <span className="stat-sub">done</span>
                    </div>
                </div>

                <div className="section-card">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">My Assigned Tasks</h2>
                            <p className="section-subtitle">Update statuses to keep your team informed</p>
                        </div>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📭</div>
                            <span>No tasks assigned yet</span>
                            <small>Your admin will assign tasks to you soon</small>
                        </div>
                    ) : (
                        <div className="task-cards-grid">
                            {tasks.map(task => (
                                <div key={task._id} className="task-card">
                                    <div>
                                        <div className="task-card-title">{task.title}</div>
                                        <div className="task-card-desc">{task.description}</div>
                                    </div>
                                    <div className="task-card-meta">
                                        Assigned by: <strong style={{ color: 'var(--text-secondary)' }}>{task.createdBy?.name || 'Admin'}</strong>
                                    </div>
                                    <div className="task-card-footer">
                                        {getStatusBadge(task.status)}
                                        <select
                                            className="status-select"
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                            title="Update status"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmployeeDashboard;
