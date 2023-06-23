package com.shyftlabs.io.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shyftlabs.io.entity.Result;

import jakarta.transaction.Transactional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

	@Transactional
	@Modifying
	@Query("DELETE FROM Result r WHERE r.student.id = :studentId")
	void deleteByStudentID(long studentId);

	@Transactional
	@Modifying
	@Query("DELETE FROM Result r WHERE r.course.id = :courseId")
	void deleteByCourseID(long courseId);
}
