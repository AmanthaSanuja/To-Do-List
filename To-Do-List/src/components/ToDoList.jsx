import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:8080/api/todos';

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', dueDate: '', priority: 'LOW' });
    const [filter, setFilter] = useState('ALL');

    const fetchTodos = async () => {
        const res = await axios.get(`${API_URL}/all`);
        setTodos(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/create`, { ...form, completed: false });
        setForm({ title: '', description: '', dueDate: '', priority: 'LOW' });
        fetchTodos();
    };

    const handleUpdate = async (id, completed) => {
        const todo = todos.find(t => t.id === id);
        await axios.put(`${API_URL}/${id}`, { ...todo, completed: !completed });
        fetchTodos();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTodos();
    };

    const filtered = todos.filter(t =>
        filter === 'ALL' ? true : filter === 'COMPLETED' ? t.completed : !t.completed
    );

    useEffect(() => { fetchTodos(); }, []);

    return (
        <motion.div className="container-fluid min-vh-100 py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="row g-4">
                {/* Left - Add Task */}
                <motion.div className="col-md-6 bg-info p-5 rounded shadow-sm" whileHover={{ scale: 1.02 }}>
                    <h2 className="text-center mb-4">Add New Task</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control mb-3" placeholder="Title" value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <textarea className="form-control mb-3" placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
                        <input type="date" className="form-control mb-3" value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                        <select className="form-control mb-4" value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                            <option>LOW</option>
                            <option>MEDIUM</option>
                            <option>HIGH</option>
                        </select>
                        <motion.button whileTap={{ scale: 0.95 }} className="btn btn-success w-100">Add Task</motion.button>
                    </form>
                </motion.div>

                {/* Right - Task List */}
                <motion.div className="col-md-6 bg-light p-5 rounded shadow-sm" whileHover={{ scale: 1.02 }}>
                    <h2 className="mb-3">Your Tasks</h2>
                    <div className="btn-group mb-4">
                        <button className={`btn btn-sm ${filter === 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('ALL')}>All</button>
                        <button className={`btn btn-sm ${filter === 'COMPLETED' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter('COMPLETED')}>Completed</button>
                        <button className={`btn btn-sm ${filter === 'PENDING' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter('PENDING')}>Pending</button>
                    </div>

                    {filtered.length === 0 ? (
                        <p className="text-muted">No tasks to display.</p>
                    ) : (
                        <ul className="list-group">
                            {filtered.map(todo => (
                                <motion.li layout key={todo.id} className="list-group-item d-flex justify-content-between align-items-start flex-wrap mb-2 border rounded shadow-sm">
                                    <div>
                                        <strong className="fs-5">{todo.title}</strong><br />
                                        <small className="text-muted">{todo.description}</small><br />
                                        <small className="text-muted">Due: {todo.dueDate} | Priority: {todo.priority}</small>
                                    </div>
                                    <div className="mt-2">
                                        <button className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-outline-success'} me-2`} onClick={() => handleUpdate(todo.id, todo.completed)}>
                                            {todo.completed ? '✓ Done' : 'Mark Done'}
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(todo.id)}>🗑️</button>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ToDoList;
