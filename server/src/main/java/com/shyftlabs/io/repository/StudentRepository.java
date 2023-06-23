package com.shyftlabs.io.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shyftlabs.io.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

	 @Query("SELECT s FROM Student s WHERE s.email = :email")
	 Student findByEmail(String email);
	 
}
