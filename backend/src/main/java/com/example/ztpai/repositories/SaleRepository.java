package com.example.ztpai.repositories;

import com.example.ztpai.models.Client;
import com.example.ztpai.models.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    List<Sale> findAllByClientIdIn(List<Integer> clientIds);
    Page<Sale> findAllByClientIdIn(List<Integer> clientIds, Pageable pageable);
    Set<Sale> findByClient(Client client);
    Page<Sale> findAllByClientIdInAndProduct_NameContainingIgnoreCase(List<Integer> clientIds, String productName, Pageable pageable);
    @Query("SELECT s FROM Sale s WHERE s.client.id IN :clientIds AND (LOWER(s.client.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(s.client.surname) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Sale> findSalesByClientNameOrSurnameContainingIgnoreCase(@Param("clientIds") List<Integer> clientIds, @Param("searchTerm") String searchTerm, Pageable pageable);
}
