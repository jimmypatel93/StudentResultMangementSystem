package com.shyftlabs.io.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shyftlabs.io.entity.Course;
import com.shyftlabs.io.entity.Result;
import com.shyftlabs.io.exceptions.ResourceNotFoundException;
import com.shyftlabs.io.exceptions.UnprocessableEntityException;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.repository.CourseRepository;
import com.shyftlabs.io.repository.ResultRepository;
import com.shyftlabs.io.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private ResultRepository resultRepository;

	@Override
	public ResponseEntity<GenericResponse<Course>> saveCourse(Course course) {
		if (course.getCourseName().isBlank() || course.getCourseName().isEmpty()) {
			throw new UnprocessableEntityException("Please check the fields");
		} else {
			try {
				courseRepository.save(course);
				GenericResponse<Course> response = new GenericResponse<>(true, "Course added successfully", course);
				return new ResponseEntity<>(response, HttpStatus.CREATED);
			} catch (UnprocessableEntityException ex) {
				throw new UnprocessableEntityException("Please check the fields");
			}
		}
	}

	@Override
	public ResponseEntity<GenericResponse<List<Course>>> getAllCourses() {
		try {
			List<Course> courses = courseRepository.findAll();
			GenericResponse<List<Course>> response = new GenericResponse<>(true, "All courses", courses);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (UnprocessableEntityException ex) {
			throw new UnprocessableEntityException("Fetch all data failed");
		}
	}

	@Override
	public ResponseEntity<GenericResponse<String>> delete(long courseId) {
		Course course = findCourseById(courseId);
		resultRepository.deleteByCourseID(courseId);
		courseRepository.delete(course);
		GenericResponse<String> response = new GenericResponse<String>(true, "student deleted successfully", "deleted");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	private Course findCourseById(long id) {
		return courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
	}

}
