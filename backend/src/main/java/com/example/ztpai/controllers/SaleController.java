package com.example.ztpai.controllers;

import com.example.ztpai.models.Sale;
import com.example.ztpai.repositories.SaleRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class SaleController {
    private final SaleRepository saleRepository;

    public SaleController(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }
    @GetMapping("/sales")
    public List<Sale> getSales() {
        return saleRepository.findAll();
    }
    @PostMapping("/sale-add")
    public Sale addSale(@RequestBody Sale sale)
    {
        return saleRepository.save(sale);
    }
}
