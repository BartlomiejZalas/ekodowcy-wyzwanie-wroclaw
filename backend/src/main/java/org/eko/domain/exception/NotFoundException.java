package org.eko.domain.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(Class<?> clazz, long id) {
        super(String.format("%s with id %d not found", clazz.getSimpleName(), id));
    }
}
