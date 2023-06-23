package com.shyftlabs.io.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shyftlabs.io.entity.Course;
import com.shyftlabs.io.entity.Result;
import com.shyftlabs.io.entity.Student;
import com.shyftlabs.io.exceptions.ResourceNotFoundException;
import com.shyftlabs.io.exceptions.UnprocessableEntityException;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.model.RequestResultDTO;
import com.shyftlabs.io.model.ResultDTO;
import com.shyftlabs.io.model.StudentDTO;
import com.shyftlabs.io.repository.CourseRepository;
import com.shyftlabs.io.repository.ResultRepository;
import com.shyftlabs.io.repository.StudentRepository;
import com.shyftlabs.io.service.ResultService;

@Service
public class ResultServiceImpl implements ResultService {

	private List<String> resultList = new ArrayList<>();
	public ResultServiceImpl() {
		resultList.addAll(Arrays.asList("A","B","C","D","E","F"));
	}
	
	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private ResultRepository resultRepository;

	@Override
	public ResponseEntity<GenericResponse<List<StudentDTO>>> getAllStudents() {
		try {
			List<Student> students = studentRepository.findAll();
			List<StudentDTO> studentDTO = new ArrayList<>();
			for (Student student : students) {
				StudentDTO stdDTO = StudentDTO.builder().id(student.getId())
						.name(student.getFirstName() + " " + student.getFamilyName()).build();
				studentDTO.add(stdDTO);
			}
			GenericResponse<List<StudentDTO>> response = new GenericResponse<>(true, "Fetched all students", studentDTO);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (ResourceNotFoundException ex) {
			throw new ResourceNotFoundException("Student not found");
		}
	}

	@Override
	public ResponseEntity<GenericResponse<List<Course>>> getAllCourses() {
		try {
			List<Course> courses = courseRepository.findAll();
			GenericResponse<List<Course>> response = new GenericResponse<>(true, "Fetched all courses", courses);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (ResourceNotFoundException ex) {
			throw new ResourceNotFoundException("Course not found");
		}

	}

	@Override
	public ResponseEntity<GenericResponse<Result>> saveResult(RequestResultDTO result) {
		try {
			Student student = studentRepository.findById(result.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
			Course course = courseRepository.findById(result.getCourseId()).orElseThrow(() -> new ResourceNotFoundException("Course not found"));
			if(!resultList.contains(result.getScore())) {
				throw new UnprocessableEntityException("Invalid score entry, try again");
			}
			Result finalResult = Result.builder().course(course).student(student).score(result.getScore()).build();
			resultRepository.save(finalResult);
			GenericResponse<Result> response = new GenericResponse<>(true, "Result saved successfully", finalResult);
			return new ResponseEntity<>(response, HttpStatus.CREATED);			
		}catch(UnprocessableEntityException ex) {
			throw new UnprocessableEntityException("Please check the fields entired");
		}

	}

	@Override
	public ResponseEntity<GenericResponse<List<ResultDTO>>> getAllResults() {
		List<Result> results = resultRepository.findAll();
		List<ResultDTO> resultDTO = new ArrayList<>();
		for(Result result : results) {
			ResultDTO resultdto = ResultDTO.builder().id(result.getId()).courseName(result.getCourse().getCourseName())
						.studentName(result.getStudent().getFirstName() + " " + result.getStudent().getFamilyName())
						.score(result.getScore()).build();
			resultDTO.add(resultdto);
		}
		GenericResponse<List<ResultDTO>> response = new GenericResponse<>(true, "Result get successful", resultDTO);
		return new ResponseEntity<>(response, HttpStatus.CREATED);	
	}

}
