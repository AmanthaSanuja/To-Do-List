package com.example.ToDoList.Service;

import com.example.ToDoList.Entity.Todo;
import com.example.ToDoList.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepo;

    @Autowired
    public TodoService(TodoRepository todoRepo) {
        this.todoRepo = todoRepo;
    }

    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepo.findAll();
    }

    // Create new todo
    public Todo createTodo(Todo todo) {
        return todoRepo.save(todo);
    }

    // Update todo
    public Optional<Todo> updateTodo(Long id, Todo updated) {
        return todoRepo.findById(id).map(todo -> {
            todo.setTitle(updated.getTitle());
            todo.setDescription(updated.getDescription());
            todo.setCompleted(updated.isCompleted());
            todo.setDueDate(updated.getDueDate());
            todo.setPriority(updated.getPriority());
            return todoRepo.save(todo);
        });
    }

    // Delete todo
    public void deleteTodo(Long id) {
        todoRepo.deleteById(id);
    }

    // Optional: Get one todo
    public Optional<Todo> getTodoById(Long id) {
        return todoRepo.findById(id);
    }
}
