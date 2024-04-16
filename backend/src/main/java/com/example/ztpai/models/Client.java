package com.example.ztpai.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "Clients")
public class Client {
    @Id
    @GeneratedValue
    private Integer id;
    @NotEmpty(message = "name cannot be empty")
    private String name;
    @NotEmpty
    private String surname;
    private double discount;
    private String phone_number;
    private String email;
    private Date date;
    private String note;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Sale> sales;

    @PrePersist
    protected void onCreate() {
        this.date = new Date();
    }


}
