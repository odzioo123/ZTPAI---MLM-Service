package com.example.ztpai.repositories;

import com.example.ztpai.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    List<Sale> findAllByClientIdIn(List<Integer> clientIds);
}
