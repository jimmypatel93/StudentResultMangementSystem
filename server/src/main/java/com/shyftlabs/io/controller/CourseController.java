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

import com.shyftlabs.io.entity.Course;
import com.shyftlabs.io.entity.Student;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.service.CourseService;

@RestController
@RequestMapping("/course")
public class CourseController {

	@Autowired
	private CourseService courseService;
	
	
	@PostMapping
	public ResponseEntity<GenericResponse<Course>> saveCourse(@RequestBody Course course){
	 	 return courseService.saveCourse(course);
	}
	
	@GetMapping("/list")
	public ResponseEntity<GenericResponse<List<Course>>> getAll(){
		return courseService.getAllCourses();
	}
		
	@DeleteMapping("/{id}")
	public ResponseEntity<GenericResponse<String>> delete(@PathVariable("id") long courseId) {
    	return courseService.delete(courseId);
    	
    }
}
