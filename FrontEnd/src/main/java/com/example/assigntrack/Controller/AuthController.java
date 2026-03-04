package com.example.assigntrack.Controller;

import com.example.assigntrack.Entity.User;
import com.example.assigntrack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public String register(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists!";
        }

        userRepository.save(user);
        return "User registered successfully!";
    }


    @PostMapping("/login")
    public Object login(@RequestBody User loginUser) {

        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());

        if (user.isPresent() &&
                user.get().getPassword().equals(loginUser.getPassword())) {

            return user.get();
        }

        return "Invalid email or password!";
    }
}