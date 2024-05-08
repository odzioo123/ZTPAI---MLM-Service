package com.example.ztpai.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Table(name = "user_types")
@Data
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;

    @OneToMany(
            mappedBy = "userType",
            cascade = CascadeType.ALL
    )
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    private List<User> users;
}
