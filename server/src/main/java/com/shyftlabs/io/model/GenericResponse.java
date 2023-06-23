package com.shyftlabs.io.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GenericResponse<T> {
	private boolean success;
	private String message;
	private T data;
	
}
