import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [formMsg, setFormMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchTasks(); fetchUsers(); }, []);

    const fetchTasks = async () => {
        try { const { data } = await api.get('/tasks'); setTasks(data); } catch { }
    };
    const fetchUsers = async () => {
        try { const { data } = await api.get('/auth/users'); setUsers(data); } catch { }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!assignedTo) { setFormMsg({ type: 'error', text: 'Please select an employee.' }); return; }
        setLoading(true); setFormMsg({ type: '', text: '' });
        try {
            await api.post('/tasks', { title, description, assignedTo });
            setTitle(''); setDescription(''); setAssignedTo('');
            setFormMsg({ type: 'success', text: 'Task created successfully!' });
            fetchTasks();
        } catch {
            setFormMsg({ type: 'error', text: 'Failed to create task.' });
        }
        setLoading(false);
    };

    const handleAssignClick = (userId) => {
        setAssignedTo(userId);
        document.getElementById('task-form-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const getStatusBadge = (status) => {
        if (status === 'Completed') return <span className="badge badge-completed">✓ Completed</span>;
        if (status === 'In Progress') return <span className="badge badge-progress">⟳ In Progress</span>;
        return <span className="badge badge-pending">◌ Pending</span>;
    };

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
                        <span className="stat-label">Employees</span>
                        <span className="stat-value">{users.length}</span>
                        <span className="stat-sub">registered</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Total Tasks</span>
                        <span className="stat-value">{tasks.length}</span>
                        <span className="stat-sub">all time</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Completed</span>
                        <span className="stat-value">{tasks.filter(t => t.status === 'Completed').length}</span>
                        <span className="stat-sub">done</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">In Progress</span>
                        <span className="stat-value">{tasks.filter(t => t.status === 'In Progress').length}</span>
                        <span className="stat-sub">ongoing</span>
                    </div>
                </div>

                {/* Task Form */}
                <div id="task-form-section" className="section-card">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">Create New Task</h2>
                            <p className="section-subtitle">Assign work to a team member</p>
                        </div>
                    </div>
                    {formMsg.text && <div className={formMsg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginBottom: '1rem' }}>{formMsg.text}</div>}
                    <form onSubmit={handleCreateTask}>
                        <div className="task-form-grid">
                            <div className="form-group">
                                <label className="form-label">Task Title</label>
                                <input id="task-title" className="form-input" type="text" placeholder="e.g. Design landing page" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Assigned To</label>
                                <select id="task-assign" className="form-select" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                                    <option value="">-- Select Employee --</option>
                                    {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                                </select>
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label className="form-label">Description</label>
                                <textarea id="task-desc" className="form-textarea" placeholder="Describe the task in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-gradient" disabled={loading}>{loading ? 'Creating...' : '+ Create Task'}</button>
                        </div>
                    </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                    {/* Employees */}
                    <div className="section-card">
                        <div className="section-header">
                            <div>
                                <h2 className="section-title">All Employees</h2>
                                <p className="section-subtitle">{users.length} registered</p>
                            </div>
                        </div>
                        {users.length === 0 ? (
                            <div className="empty-state"><div className="empty-state-icon">👥</div><span>No employees registered yet</span></div>
                        ) : (
                            <table className="resp-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(emp => (
                                        <tr key={emp._id}>
                                            <td data-label="Name" style={{ fontWeight: 600 }}>{emp.name}</td>
                                            <td data-label="Email" style={{ color: 'var(--text-secondary)' }}>{emp.email}</td>
                                            <td data-label="Action">
                                                <button className="btn btn-primary btn-sm" onClick={() => handleAssignClick(emp._id)}>Assign Task</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Tasks */}
                    <div className="section-card" style={{ gridColumn: 'span 1' }}>
                        <div className="section-header">
                            <div>
                                <h2 className="section-title">All Tasks</h2>
                                <p className="section-subtitle">{tasks.length} total</p>
                            </div>
                        </div>
                        {tasks.length === 0 ? (
                            <div className="empty-state"><div className="empty-state-icon">📋</div><span>No tasks created yet</span></div>
                        ) : (
                            <table className="resp-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Assigned To</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task._id}>
                                            <td data-label="Title">
                                                <div style={{ fontWeight: 600 }}>{task.title}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{task.description}</div>
                                            </td>
                                            <td data-label="Assigned To" style={{ color: 'var(--text-secondary)' }}>{task.assignedTo?.name || '—'}</td>
                                            <td data-label="Status">{getStatusBadge(task.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
