package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
