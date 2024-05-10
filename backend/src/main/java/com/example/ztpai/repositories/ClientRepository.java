package com.example.ztpai.repositories;

import com.example.ztpai.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    List<Client> findAllByNameContaining(String name);
    List<Client> findAllByUser_Id(int id);
}
