package com.shyftlabs.io.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.shyftlabs.io.entity.Course;
import com.shyftlabs.io.entity.Result;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.model.RequestResultDTO;
import com.shyftlabs.io.model.ResultDTO;
import com.shyftlabs.io.model.StudentDTO;

public interface ResultService {

	ResponseEntity<GenericResponse<List<StudentDTO>>> getAllStudents();

	ResponseEntity<GenericResponse<List<Course>>> getAllCourses();

	ResponseEntity<GenericResponse<List<ResultDTO>>> getAllResults();

	ResponseEntity<GenericResponse<Result>> saveResult(RequestResultDTO result);

}
