package com.example.ztpai.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
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
    @JoinTable(
            name = "Product_ProductType",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "product_type_id")
    )
    @JsonIgnoreProperties("products") // sus
    private List<ProductType> productType;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Sale> sales;
}
