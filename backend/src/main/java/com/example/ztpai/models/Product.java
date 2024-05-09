package com.example.ztpai.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private Integer code;
    private String name;
    private double price;
    private double points;
    @ManyToMany
    private Set<ProductType> productType;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Sale> sales;
}
