package com.shyftlabs.io.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shyftlabs.io.entity.Course;
@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{
}
