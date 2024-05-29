package com.example.ztpai.controllers;

import com.example.ztpai.auth.JwtService;
import com.example.ztpai.models.Client;
import com.example.ztpai.repositories.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
public class ClientController {
    private final ClientRepository clientRepository;
    private final JwtService jwtService;

    public ClientController(ClientRepository clientRepository, JwtService jwtService) {
        this.clientRepository = clientRepository;
        this.jwtService = jwtService;
    }
//    @PreAuthorize("hasRole('Admin')")

    @GetMapping("/clients")
    public List<Client> getClients(@RequestHeader("Authorization") String token) {
        Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
        return clientRepository.findAllByUser_Id(userId);
    }

//    @GetMapping("/clients/{client-id}")
//    public Client getClientByID(
//            @PathVariable("client-id") Integer id
//    ){
//        return clientRepository.findById(id).orElse(null);
//    }
//
//    @GetMapping("/clients/user/{user-id}")
//    public List<Client> getClientByUserID(
//            @PathVariable("user-id") Integer id
//    ){
//        return clientRepository.findAllByUser_Id(id);
//    }
//
//    @GetMapping("/clients/search/{client-name}")
//    public List<Client> getClientsByName(
//            @PathVariable("client-name") String name
//    ){
//        return clientRepository.findAllByNameContaining(name);
//    }

    @PostMapping("/clients-add")
    public Client addClient(@Valid @RequestBody Client client)
    {
        return clientRepository.save(client);
    }

    @DeleteMapping("/clients/{client-id}")
    public ResponseEntity<String> deleteClientById(@PathVariable("client-id") Integer id, @RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
            Client client = clientRepository.findById(id).orElse(null);

            if (client != null && client.getUser().getId().equals(userId)) {
                clientRepository.deleteById(id);
                return ResponseEntity.ok().body("Client with ID " + id + " deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to delete this client");
            }
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client with ID " + id + " not found");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete client with ID " + id);
        }
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
