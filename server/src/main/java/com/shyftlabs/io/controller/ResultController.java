package com.shyftlabs.io.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shyftlabs.io.entity.Course;
import com.shyftlabs.io.entity.Result;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.model.RequestResultDTO;
import com.shyftlabs.io.model.ResultDTO;
import com.shyftlabs.io.model.StudentDTO;
import com.shyftlabs.io.service.ResultService;

@RestController
@RequestMapping("/result")
public class ResultController {

	@Autowired
	private ResultService resultService;

	@GetMapping("/allStudents")
	public ResponseEntity<GenericResponse<List<StudentDTO>>> getAllStudents() {
		return resultService.getAllStudents();
	}

	@GetMapping("/allCourses")
	public ResponseEntity<GenericResponse<List<Course>>> getAllCourses() {
		return resultService.getAllCourses();
	}
	
	@PostMapping
	public ResponseEntity<GenericResponse<Result>> saveCourse(@RequestBody RequestResultDTO result) {
		return resultService.saveResult(result);
	}
	
	@GetMapping("/list")
	public ResponseEntity<GenericResponse<List<ResultDTO>>> getAllResults(){
		return resultService.getAllResults();
	}
	
}
