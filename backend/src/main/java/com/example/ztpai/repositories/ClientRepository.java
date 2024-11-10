package com.example.ztpai.repositories;

import com.example.ztpai.models.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    List<Client> findAllByUser_Id(Integer userId);
    Page<Client> findAllByUser_Id(Integer userId, Pageable pageable);
    @Query("SELECT c FROM Client c WHERE c.user.id = :userId AND (" +
            "LOWER(CONCAT(c.name, ' ', c.surname)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.phone_number) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.note) LIKE LOWER(CONCAT('%', :searchTerm, '%')) AND " +
            "(c.date BETWEEN :fromDate AND :toDate))")
    Page<Client> searchClients(
            @Param("userId") Integer userId,
            @Param("searchTerm") String searchTerm,
            @Param("fromDate") Date fromDate,
            @Param("toDate") Date toDate,
            Pageable pageable
    );
    Page<Client> findAllByUser_IdAndDateBetween(
            Integer userId,
            Date startDate,
            Date endDate,
            Pageable pageable
    );
    @Query("SELECT c FROM Client c WHERE c.user.id = :userId AND (" +
            "LOWER(CONCAT(c.name, ' ', c.surname)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.phone_number) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.note) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Client> searchClients(
            @Param("userId") Integer userId,
            @Param("searchTerm") String searchTerm,
            Pageable pageable
    );


}
