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
    @ManyToOne
    @JoinColumn(name = "type_id")
    private ProductType productType;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Sale> sales;
}
