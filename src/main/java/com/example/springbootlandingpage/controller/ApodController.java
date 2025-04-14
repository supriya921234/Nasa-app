package com.example.springbootlandingpage.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ApodController {

    @Value("${nasa.apod.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/api/apod")
    public ResponseEntity<String> getApod(@RequestParam String date) {
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + date;
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }
}