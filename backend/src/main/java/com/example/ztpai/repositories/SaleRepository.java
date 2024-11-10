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
    Set<Sale> findByClient(Client client);
    @Query("SELECT s FROM Sale s WHERE s.client.id IN :clientIds AND " +
            "(:searchTerm IS NULL OR " +
            "LOWER(CONCAT(s.client.name, ' ', s.client.surname)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.product.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.note) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "CAST(s.product.price AS string) LIKE CONCAT('%', :searchTerm, '%') OR " +
            "CAST(s.date AS string) LIKE CONCAT('%', :searchTerm, '%'))")
    Page<Sale> findAllByClientIdInAndSearchTerm(
            @Param("clientIds") List<Integer> clientIds,
            @Param("searchTerm") String searchTerm,
            Pageable pageable);
    Page<Sale> findAllByClientIdIn(List<Integer> clientIds, Pageable pageable);
    @Query("SELECT s FROM Sale s WHERE s.client.id IN :clientIds AND " +
            "(CAST(s.date AS date) BETWEEN :startDate AND :endDate) AND " +
            "(:searchTerm IS NULL OR " +
            "LOWER(CONCAT(s.client.name, ' ', s.client.surname)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.product.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.note) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "CAST(s.product.price AS string) LIKE CONCAT('%', :searchTerm, '%'))")
    Page<Sale> findAllByClientIdInAndSearchTermWithDateRange(
            @Param("clientIds") List<Integer> clientIds,
            @Param("searchTerm") String searchTerm,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);
    @Query("SELECT s FROM Sale s WHERE s.client.id IN :clientIds AND " +
            "(CAST(s.date AS date) BETWEEN :startDate AND :endDate) ")
    Page<Sale> findAllByClientIdInAndDateRange(
            List<Integer> clientIds,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);
}
