package com.shyftlabs.io.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorDetails {
	private boolean success;
    private String message;
    private String details;
}
