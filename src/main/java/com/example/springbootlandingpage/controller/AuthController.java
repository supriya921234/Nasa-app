package com.example.springbootlandingpage.controller;

import com.example.springbootlandingpage.entity.User;
import com.example.springbootlandingpage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null || userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email already exists");
        }
        userService.registerUser(user.getUsername(), user.getPassword(), "USER");
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser() {
        // Spring Security handles authentication automatically
        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        // Spring Security handles logout automatically
        return ResponseEntity.ok("Logout successful");
    }
}