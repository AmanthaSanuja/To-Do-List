package com.example.ToDoList.Controller;

import com.example.ToDoList.Entity.Todo;
import com.example.ToDoList.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin("*")
public class TodoController {

    @Autowired
    private TodoRepository todoRepo;

    @GetMapping
    public List<Todo> getAll() {
        return todoRepo.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoRepo.save(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo updated) {
        return todoRepo.findById(id).map(todo -> {
            todo.setTitle(updated.getTitle());
            todo.setDescription(updated.getDescription());
            todo.setCompleted(updated.isCompleted());
            todo.setDueDate(updated.getDueDate());
            todo.setPriority(updated.getPriority());
            return ResponseEntity.ok(todoRepo.save(todo));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        todoRepo.deleteById(id);
    }
}

