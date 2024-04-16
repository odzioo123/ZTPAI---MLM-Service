package com.example.ztpai.controllers;

import com.example.ztpai.models.Client;
import com.example.ztpai.repositories.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class ClientController {
    private final ClientRepository clientRepository;

    public ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }
    @GetMapping("/clients")
    public List<Client> getClients(){
        return clientRepository.findAll();
    }
    @GetMapping("/clients/{client-id}")
    public Client getClientByID(
            @PathVariable("client-id") Integer id
    ){
        return clientRepository.findById(id).orElse(null);
    }
    @GetMapping("/clients/search/{client-name}")
    public List<Client> getClientsByName(
            @PathVariable("client-name") String name
    ){
        return clientRepository.findAllByNameContaining(name);
    }

    @PostMapping("/clients-add")
    public Client addClient(@Valid @RequestBody Client client)
    {
        return clientRepository.save(client);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exp
    ) {
        var errors = new HashMap<String, String>();
        exp.getBindingResult().getAllErrors().forEach(error ->{
            var fieldName = ((FieldError) error).getField();
            var message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
