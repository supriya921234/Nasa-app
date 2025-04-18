package com.nasa.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// @EnableEurekaClient (not needed with Spring Boot 2.x+)
@EntityScan(basePackages = "com.nasa.core.entity")
@EnableJpaRepositories(basePackages = "com.nasa.core.repository")
public class NasaApplication {
    public static void main(String[] args) {
        SpringApplication.run(NasaApplication.class, args);
    }
}
