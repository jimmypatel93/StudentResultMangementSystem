package com.shyftlabs.io.exceptions;

public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(final String message) {
		super(message);
	}
}