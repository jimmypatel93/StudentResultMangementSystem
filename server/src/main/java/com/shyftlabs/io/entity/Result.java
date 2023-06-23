package com.shyftlabs.io.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "result")
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "course_id")
	private Course course;

	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "student_id")
	private Student student;

	private String score;
}
