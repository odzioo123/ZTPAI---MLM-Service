package com.example.ztpai.controllers;

import com.example.ztpai.models.Product;
import com.example.ztpai.models.ProductType;
import com.example.ztpai.repositories.ProductRepository;
import com.example.ztpai.repositories.ProductTypeRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.*;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    public ProductController(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
    }
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> products = productRepository.findAll(pageable);
            return ResponseEntity.ok(products);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/products-all")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> allProducts = productRepository.findAll();
            return ResponseEntity.ok(allProducts);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/product-types")
    public ResponseEntity<List<ProductType>> getProductTypes() {
        try {
            List<ProductType> productTypes = productTypeRepository.findAll();
            return ResponseEntity.ok(productTypes);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/products-add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        try {
            List<ProductType> productTypes = new ArrayList<>();
            for (ProductType productType : product.getProductType()) {
                ProductType fetchedProductType = productTypeRepository.findById(productType.getId())
                        .orElseThrow(() -> new NoSuchElementException("ProductType not found with ID: " + productType.getId()));
                productTypes.add(fetchedProductType);
            }

            product.setProductType(productTypes);
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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
