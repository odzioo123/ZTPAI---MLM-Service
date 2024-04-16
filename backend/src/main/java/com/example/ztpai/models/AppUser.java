package com.example.ztpai.models;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "Users")
public class AppUser {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String login;
    private String password;
    private Integer role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Product> products;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Client> clients;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Notification> notifications;
}
