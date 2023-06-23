package com.shyftlabs.io.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(value = { ResourceNotFoundException.class })
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ErrorDetails resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
		return new ErrorDetails(false, ex.getMessage(), request.getDescription(false));
	}

	@ExceptionHandler(value = { UnprocessableEntityException.class })
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	public ErrorDetails unprocessedEntityException(UnprocessableEntityException ex, WebRequest request) {
		return new ErrorDetails(false, ex.getMessage(), request.getDescription(false));
	}

	@ExceptionHandler(value = { InvalidRequestException.class })
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ErrorDetails resourceNotFoundException(InvalidRequestException ex, WebRequest request) {
		return new ErrorDetails(false, ex.getMessage(), request.getDescription(false));
	}
	
	@ExceptionHandler(value = { DuplicateContentException.class })
	@ResponseStatus(value = HttpStatus.CONFLICT)
	public ErrorDetails duplicateContentException(DuplicateContentException ex, WebRequest request) {
		return new ErrorDetails(false, ex.getMessage(), request.getDescription(false));
	}
}
