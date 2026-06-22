package com.cdfxlabs.backend.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * The one-and-only security configuration.
 *
 * SENIOR NOTES:
 *
 * - There used to be a WebConfig in this project that ALSO configured
 *   CORS. We deleted it - two CORS configs is a recipe for confusion.
 *   This file is now the single source of truth.
 *
 * - The reason CORS lives in SecurityConfig (rather than WebConfig) is
 *   that Spring Security has its own filter chain that runs BEFORE
 *   Spring MVC. If we only configured CORS in WebMvcConfigurer, the
 *   Security filter would block requests before MVC ever saw them.
 *   Letting Security own CORS guarantees it's applied at the right
 *   layer.
 *
 * - @Configuration tells Spring "this class declares beans". Methods
 *   annotated @Bean become singletons in the ApplicationContext.
 *   Spring builds them at startup, caches them, and injects them
 *   wherever they're needed.
 *
 * - This file is currently PERMISSIVE - .anyRequest().permitAll()
 *   means every endpoint is public. That's intentional for the MVP
 *   chain proving phase. When we add JWT validation we'll replace
 *   that line with rules like:
 *     .requestMatchers(HttpMethod.GET, "/api/listings").permitAll()
 *     .requestMatchers(HttpMethod.POST, "/api/listings").authenticated()
 *     .requestMatchers("/api/admin/**").hasRole("ADMIN")
 *     .anyRequest().authenticated()
 */
@Configuration
public class SecurityConfig {

    /**
     * @Value pulls from application.properties at startup. Note this is
     * SPRING'S @Value (from org.springframework.beans.factory.annotation),
     * NOT Lombok's @Value (which is something completely different).
     *
     * The comma-separated string in application.properties becomes a
     * String[] thanks to Spring's relaxed binding.
     */
    @Value("${cors.allowed-origins}")
    private String[] allowedOrigins;

    /**
     * The security filter chain. Every HTTP request passes through this
     * chain before reaching your controllers - it's the framework's
     * gatekeeper.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF protection is for browser form submissions - the
                // attack relies on cookies + HTML forms. Stateless JSON
                // APIs have neither, so CSRF protection only causes problems
                // (it would block legitimate POST requests from Angular).
                .csrf(csrf -> csrf.disable())

                // Apply our CORS configuration
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // No HTTP sessions on the server - JWTs are stateless by
                // design. Each request brings its own auth (later, once we
                // add the JWT filter).
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        // Documentation + ops endpoints stay public
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/actuator/health",
                                "/actuator/info"
                        ).permitAll()

                        // TEMPORARY - remove this line when we add JWT validation
                        .anyRequest().permitAll()
                )

                // Spring Security normally shows a login form for HTML
                // clients and an HTTP Basic challenge for API clients.
                // Both are wrong for our JWT-based API. Disable them so
                // Spring doesn't try to challenge requests it can't handle.
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    /**
     * Defines CORS rules. CORS is enforced by the browser - the server's
     * job is to TELL the browser what's allowed. The browser then decides
     * to block or allow the request based on these headers.
     *
     * Note: this same configuration logic could live in a WebMvcConfigurer
     * but it would not apply to requests blocked by Spring Security
     * before MVC gets them. Putting it here means it's checked first.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(allowedOrigins));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
