package com.example.ztpai.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "Product_Types")
public class ProductType {
    @Id
    @GeneratedValue
    private Integer id;
    private String type;
    @OneToMany(mappedBy = "productType", cascade = CascadeType.ALL)
    private Set<Product> products;
}
