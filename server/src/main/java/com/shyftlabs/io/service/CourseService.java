package com.shyftlabs.io.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.shyftlabs.io.entity.Course;
import com.shyftlabs.io.model.GenericResponse;

public interface CourseService {

	ResponseEntity<GenericResponse<Course>> saveCourse(Course course);

	ResponseEntity<GenericResponse<List<Course>>> getAllCourses();

	ResponseEntity<GenericResponse<String>> delete(long courseId);

}
