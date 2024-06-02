package com.example.ztpai.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Product_Types")
public class ProductType {
    @Id
    @GeneratedValue
    private Integer id;
    private String type;
    @ManyToMany(mappedBy = "productType", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("productType") // sus
    private List<Product> products;
}
