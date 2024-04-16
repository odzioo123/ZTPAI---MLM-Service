package com.example.ztpai.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MainController {
    @GetMapping("/hello")
    public String sayHello() {return "Hello from MainController";}

    @GetMapping("/login")
    public String getLogin(){return "Hello from login";}

}
