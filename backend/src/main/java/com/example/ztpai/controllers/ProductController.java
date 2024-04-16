package com.example.ztpai.controllers;

import com.example.ztpai.models.Product;
import com.example.ztpai.repositories.ProductRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
