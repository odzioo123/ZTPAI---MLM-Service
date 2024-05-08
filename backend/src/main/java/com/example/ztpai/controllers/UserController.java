package com.example.ztpai.controllers;

import com.example.ztpai.models.User;
import com.example.ztpai.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class UserController{
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }
    @PostMapping("/user-add")
    public User addUser(@RequestBody User user)
    {
        return userRepository.save(user);
    }

}
