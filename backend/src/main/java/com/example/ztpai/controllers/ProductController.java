package com.example.ztpai.controllers;

import com.example.ztpai.models.Product;
import com.example.ztpai.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping("/products")
    public List<Product> getProducts(){
        return productRepository.findAll();
    }
    @PostMapping("/product-add")
    public Product addProduct(@RequestBody Product appUser)
    {
        return productRepository.save(appUser);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/products/{product-id}")
    public ResponseEntity<String> deleteProductById(@PathVariable("product-id") Integer id) {
        try {
            productRepository.deleteById(id);
            return ResponseEntity.ok().body("Product with ID " + id + " deleted successfully");
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + id + " not found");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product with ID " + id);
        }
    }
}
