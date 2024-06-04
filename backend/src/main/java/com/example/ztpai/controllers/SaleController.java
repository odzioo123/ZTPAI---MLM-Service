package com.example.ztpai.controllers;

import com.example.ztpai.auth.JwtService;
import com.example.ztpai.models.Client;
import com.example.ztpai.models.Product;
import com.example.ztpai.models.Sale;
import com.example.ztpai.repositories.ProductRepository;
import com.example.ztpai.repositories.SaleRepository;
import com.example.ztpai.repositories.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final ProductRepository productRepository;
    private final JwtService jwtService;

    public SaleController(SaleRepository saleRepository, ClientRepository clientRepository, ProductRepository productRepository, JwtService jwtService) {
        this.saleRepository = saleRepository;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.jwtService = jwtService;
    }
    @GetMapping("/sales")
    public ResponseEntity<Page<Sale>> getSales(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String clientName) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
            List<Integer> clientIds = clientRepository.findAllByUser_Id(userId).stream()
                    .map(Client::getId)
                    .collect(Collectors.toList());
            Pageable pageable = PageRequest.of(page, size);

            Page<Sale> salesPage;
            if (productName != null && !productName.isEmpty()) {
                salesPage = saleRepository.findAllByClientIdInAndProduct_NameContainingIgnoreCase(clientIds, productName, pageable);
            } else if (clientName != null && !clientName.isEmpty()) {
                salesPage = saleRepository.findSalesByClientNameOrSurnameContainingIgnoreCase(clientIds, clientName, pageable);
            } else {
                salesPage = saleRepository.findAllByClientIdIn(clientIds, pageable);
            }

            return ResponseEntity.ok(salesPage);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PostMapping("/sales-add")
    public ResponseEntity<?> addSale(@RequestBody Sale sale, @RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
            Client client = clientRepository.findById(sale.getClient().getId()).orElseThrow(() -> new NoSuchElementException("Client not found"));
            Product product = productRepository.findById(sale.getProduct().getId()).orElseThrow(() -> new NoSuchElementException("Product not found"));

            if (!client.getUser().getId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to add a sale for this client");
            }

            sale.setClient(client);
            sale.setProduct(product);
            sale.setDate(new java.util.Date());

            Sale savedSale = saleRepository.save(sale);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSale);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add sale: " + ex.getMessage());
        }
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
