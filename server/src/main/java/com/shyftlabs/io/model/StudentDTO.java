package com.shyftlabs.io.model;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Service
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDTO {
	private long id;
	private String name;
}
