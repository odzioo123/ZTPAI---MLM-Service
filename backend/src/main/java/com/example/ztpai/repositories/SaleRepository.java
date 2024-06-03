package com.example.ztpai.repositories;

import com.example.ztpai.models.Client;
import com.example.ztpai.models.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    List<Sale> findAllByClientIdIn(List<Integer> clientIds);
    Page<Sale> findAllByClientIdIn(List<Integer> clientIds, Pageable pageable);

    List<Sale> findAllByClient_User_IdAndDateBetween(Integer userId, Date startDate, Date endDate);

    Set<Sale> findByClient(Client client);
}
