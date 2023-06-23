package com.shyftlabs.io.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shyftlabs.io.entity.Student;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.service.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@PostMapping
	public ResponseEntity<GenericResponse<Student>> saveUser(@RequestBody Student student) {	
		return studentService.saveStudent(student);
	}

	@GetMapping("/list")
	public ResponseEntity<GenericResponse<List<Student>>> getAll() {
		return studentService.getAllStudents();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<GenericResponse<String>> delete(@PathVariable("id") long studentId) {
		return studentService.delete(studentId);
		
	}

}
