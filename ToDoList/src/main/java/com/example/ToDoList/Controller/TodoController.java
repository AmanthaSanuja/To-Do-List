package com.example.ToDoList.Controller;

import com.example.ToDoList.Entity.Todo;
import com.example.ToDoList.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/all")
    public List<Todo> getAll() {
        return todoService.getAllTodos();
    }

    @PostMapping("/create")
    public Todo create(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo updated) {
       return todoService.updateTodo(id, updated)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
