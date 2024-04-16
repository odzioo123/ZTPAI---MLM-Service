package com.example.ztpai.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Notifications")
public class Notification {
    @Id
    @GeneratedValue
    private Integer id;
    private String text;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}
