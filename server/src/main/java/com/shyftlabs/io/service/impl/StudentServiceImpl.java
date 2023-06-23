package com.shyftlabs.io.service.impl;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shyftlabs.io.entity.Student;
import com.shyftlabs.io.exceptions.DuplicateContentException;
import com.shyftlabs.io.exceptions.ResourceNotFoundException;
import com.shyftlabs.io.exceptions.UnprocessableEntityException;
import com.shyftlabs.io.model.GenericResponse;
import com.shyftlabs.io.repository.ResultRepository;
import com.shyftlabs.io.repository.StudentRepository;
import com.shyftlabs.io.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

	private static final String EMAIL_PATTERN = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$";

	private static final String ERROR_MESSAGE = "Please check the fields";
	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private ResultRepository resultRepository;

	@Override
	public ResponseEntity<GenericResponse<Student>> saveStudent(Student student) {
		if (checkValidations(student)) {
			Student studentPresent = studentRepository.findByEmail(student.getEmail());
			if (studentPresent == null) {
				studentRepository.save(student);
				GenericResponse<Student> response = new GenericResponse<>(true, "Student added successfully", student);
				return new ResponseEntity<>(response, HttpStatus.CREATED);
			} else {
				throw new DuplicateContentException("Student email already exists");
			}
		} else {
			throw new UnprocessableEntityException(ERROR_MESSAGE);
		}
	}

	@Override
	public ResponseEntity<GenericResponse<List<Student>>> getAllStudents() {
		try {
			List<Student> students = studentRepository.findAll();
			GenericResponse<List<Student>> response = new GenericResponse<>(true, "All students", students);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (UnprocessableEntityException ex) {
			throw new UnprocessableEntityException(ERROR_MESSAGE);
		}

	}

	@Override
	public ResponseEntity<GenericResponse<String>> delete(long studentId) {
		Student student = findStudentById(studentId);
		resultRepository.deleteByStudentID(studentId);
		studentRepository.delete(student);
		GenericResponse<String> response = new GenericResponse<String>(true, "student deleted successfully", "deleted");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	private Student findStudentById(long id) {
		return studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
	}

	private boolean fieldValidator(String field) {
		return (field.isBlank() || field.isEmpty());
	}

	private static boolean isValidEmail(String email) {
		Pattern pattern = Pattern.compile(EMAIL_PATTERN);
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}

	private boolean checkValidations(Student student) {
		if (fieldValidator(student.getFirstName()) || fieldValidator(student.getFamilyName())
				|| fieldValidator(student.getEmail())) {
			throw new UnprocessableEntityException(ERROR_MESSAGE);
		}
		if (!isValidEmail(student.getEmail())) {
			throw new UnprocessableEntityException(ERROR_MESSAGE);
		}
		if (student.getDateOfBirth() == null) {
			throw new UnprocessableEntityException(ERROR_MESSAGE);
		}
		Period age = Period.between(student.getDateOfBirth().toLocalDate(), LocalDate.now());
		if (age.getYears() < 10) {
			throw new UnprocessableEntityException(ERROR_MESSAGE);
		}
		return true;
	}
}
