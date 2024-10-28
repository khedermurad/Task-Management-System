package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Task;
import com.example.backend.repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	
	@Autowired
	private TaskRepository taskRepository;
	
	@GetMapping
	public List<Task> getAllTasks(){
		return taskRepository.findAll();
	}

}
