package com.example.ztpai.controllers;

import com.example.ztpai.auth.JwtService;
import com.example.ztpai.models.Client;
import com.example.ztpai.models.Sale;
import com.example.ztpai.repositories.SaleRepository;
import com.example.ztpai.repositories.ClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
public class SaleController {
    private final SaleRepository saleRepository;
    private final ClientRepository clientRepository;
    private final JwtService jwtService;

    public SaleController(SaleRepository saleRepository, ClientRepository clientRepository, JwtService jwtService) {
        this.saleRepository = saleRepository;
        this.clientRepository = clientRepository;
        this.jwtService = jwtService;
    }
    @GetMapping("/sales")
    public List<Sale> getSales(@RequestHeader("Authorization") String token) {
        Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
        List<Integer> clientIds = clientRepository.findAllByUser_Id(userId).stream()
                .map(Client::getId)
                .collect(Collectors.toList());
        return saleRepository.findAllByClientIdIn(clientIds);
    }

    @DeleteMapping("/sales/{sale-id}")
    public ResponseEntity<String> deleteSaleById(@PathVariable("sale-id") Integer id, @RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
            Sale sale = saleRepository.findById(id).orElse(null);

            if (sale != null && sale.getClient().getUser().getId().equals(userId)) {
                saleRepository.deleteById(id);
                return ResponseEntity.ok().body("Sale with ID " + id + " deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to delete this sale");
            }
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sale with ID " + id + " not found");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete sale with ID " + id);
        }
    }

    @PostMapping("/sale-add")
    public Sale addSale(@RequestBody Sale sale)
    {
        return saleRepository.save(sale);
    }
}
