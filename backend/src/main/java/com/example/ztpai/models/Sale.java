package com.example.ztpai.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Sales")
public class Sale {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer quantity;
    private Date date;
    private String note;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @PrePersist
    protected void onCreate() {
        this.date = new Date();
    }
}
