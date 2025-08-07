import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get("http://localhost:8080/api/todos");
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (title === "") return;
        await axios.post("http://localhost:8080/api/todos", { title, completed: false });
        setTitle("");
        fetchTodos();
    };

    const toggleComplete = async (id, completed) => {
        await axios.put(`http://localhost:8080/api/todos/${id}`, { title: "", completed: !completed });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8080/api/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id, todo.completed)} />
                        {todo.title}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
