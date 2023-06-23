package com.shyftlabs.io.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.shyftlabs.io.entity.Student;
import com.shyftlabs.io.model.GenericResponse;

public interface StudentService {

	ResponseEntity<GenericResponse<Student>> saveStudent(Student student);

	ResponseEntity<GenericResponse<List<Student>>> getAllStudents();

	ResponseEntity<GenericResponse<String>> delete(long studentId);
}
