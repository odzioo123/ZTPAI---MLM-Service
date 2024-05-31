package com.example.ztpai.controllers;

import com.example.ztpai.models.Product;
import com.example.ztpai.repositories.ProductRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping("/products")
    public Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
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
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product with ID " + id + " cannot be deleted because it is referenced in sales");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product with ID " + id);
        }
    }
}
