package com.example.ztpai.controllers;

import com.example.ztpai.models.AppUser;
import com.example.ztpai.repositories.AppUserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final AppUserRepository appUserRepository;

    public UserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    @GetMapping("/users")
    public List<AppUser> getUsers(){
        return appUserRepository.findAll();
    }
    @PostMapping("/user-add")
    public AppUser addAppUser(@RequestBody AppUser appUser)
    {
        return appUserRepository.save(appUser);
    }
}
