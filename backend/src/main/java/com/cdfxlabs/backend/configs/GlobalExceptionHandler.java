package com.cdfxlabs.backend.configs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;
import java.util.Map;

/**
 * Catches exceptions thrown ANYWHERE in any @RestController and converts
 * them into a consistent JSON error response.
 *
 * SENIOR NOTES:
 *
 * - Without this class, an unhandled exception falls back to Spring
 *   Boot's default "whitelabel error page" - an HTML page wholly
 *   inappropriate for a JSON API.
 *
 * - @RestControllerAdvice is itself two annotations:
 *     @ControllerAdvice - "this class can intercept across controllers"
 *     @ResponseBody     - "return values become JSON"
 *
 * - This is the ONLY place ERROR-level logging belongs in our app.
 *   If every controller logged its own errors, you'd have:
 *     a) duplicate work
 *     b) inconsistent error formats
 *     c) the temptation to do business-logic recovery inline
 *   Centralizing here keeps controllers clean and error handling consistent.
 *
 * - Order matters: Spring picks the MOST SPECIFIC handler first.
 *   handleValidation() catches MethodArgumentNotValidException
 *   specifically. handleUnexpected() is the catch-all safety net.
 *   When you add new specific handlers (NotFoundException etc.),
 *   they take precedence over the generic Exception handler.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * The safety net. Anything not caught by a more specific handler
     * lands here.
     *
     * Logs at ERROR level (this is a real failure) and passes the full
     * Exception so the stack trace ends up in the logs. The CLIENT
     * gets a sanitized message - no stack trace, no internal class
     * names. Leaking stack traces to clients is a security disclosure
     * issue in production.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleUnexpected(Exception ex) {
        log.error("Unhandled exception", ex);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "timestamp", OffsetDateTime.now().toString(),
                        "status", 500,
                        "error", "Internal Server Error",
                        "message", "Something went wrong. This has been logged."
                ));
    }

    /**
     * Catches Jakarta Bean Validation failures from @Valid on incoming
     * DTOs. We don't have DTOs yet but the handler is in place so it
     * works the moment we add them.
     *
     * WARN, not ERROR - bad input from a client isn't a system bug.
     * It's expected behavior, and we handle it gracefully.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {

        log.warn("Validation failed: {}", ex.getMessage());

        String firstError = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .orElse("Invalid request");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "timestamp", OffsetDateTime.now().toString(),
                        "status", 400,
                        "error", "Bad Request",
                        "message", firstError
                ));
    }
}