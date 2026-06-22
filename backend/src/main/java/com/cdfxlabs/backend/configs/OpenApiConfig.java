package com.cdfxlabs.backend.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configures Swagger / OpenAPI documentation.
 *
 * The springdoc-openapi library does most of the work automatically -
 * it scans every @RestController and generates API docs. This file
 * just adds metadata (title, version, contact info) to the top of
 * those generated docs.
 *
 * Visit http://localhost:8080/swagger-ui.html to see the rendered UI.
 * The raw OpenAPI JSON spec is at http://localhost:8080/v3/api-docs.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI cdfxlabsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CDFxLabs API")
                        .description("Human-verified creator and small business registry. " +
                                "Anti-AI / Ethical-AI advocacy platform.")
                        .version("v0.1.0")
                        .contact(new Contact()
                                .name("CDFxLabs LLC")
                                .url("https://cdflabs.dev"))
                        .license(new License()
                                .name("Proprietary")));
    }
}