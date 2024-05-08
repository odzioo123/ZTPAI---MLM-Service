package com.example.ztpai.models;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;
    private String nick;
    @Column(unique = true)
    private String email;
    private String password;
    @ManyToOne
    @JoinColumn(name = "user_type_id")
    private UserType userType;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Client> clients;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Notification> notifications;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userType.getName()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
