package com.shyftlabs.io.exceptions;

public class InvalidRequestException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidRequestException(final String message) {
		super(message);
	}
}
