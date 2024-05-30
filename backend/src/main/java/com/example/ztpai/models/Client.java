package com.example.ztpai.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
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
    private String surname;
    @Min(value = 0, message = "Discount must be at least 1")
    @Max(value = 49, message = "Discount must be at most 49")
    private double discount  = 0;
    @Pattern(regexp = "\\d{1}(\\s?\\d){8}", message = "Phone number must be a 9-digit number with optional spaces")
    private String phone_number;
    private String email;
    private Date date;
    private String note;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Sale> sales;

    @PrePersist
    protected void onCreate() {
        this.date = new Date();
    }


}
