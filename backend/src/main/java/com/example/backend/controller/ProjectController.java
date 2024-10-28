package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Project;
import com.example.backend.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@GetMapping
	public List<Project> getAllProjects(){
		return projectRepository.findAll();
	}

}
