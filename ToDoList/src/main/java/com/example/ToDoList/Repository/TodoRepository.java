package com.example.ToDoList.Repository;

import com.example.ToDoList.Entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
