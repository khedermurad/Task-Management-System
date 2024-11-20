package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.exception.ResourceNotFoundException;
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
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProject(@PathVariable Long id){
		Project project = projectRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Project does not exist with id: " + id));
		
		projectRepository.delete(project);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


	@GetMapping("/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Long id){
		Project project = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project does not exist with id: " + id));

		return ResponseEntity.ok(project);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project){
		Project newProject = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project does not exist with id: " + id));

		newProject.setName(project.getName());
		newProject.setStartDate(project.getStartDate());
		newProject.setEndDate(project.getEndDate());

		newProject.getTasks().clear();
		newProject.getTasks().addAll(project.getTasks());


		Project updatedProject = projectRepository.save(newProject);

		return ResponseEntity.ok(updatedProject);
	}

	@PostMapping
	public Project createProject(@RequestBody Project project){
		return projectRepository.save(project);
	}

	

}
