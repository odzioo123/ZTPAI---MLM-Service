package com.example.ztpai.controllers;

import com.example.ztpai.models.Client;
import com.example.ztpai.models.Sale;
import com.example.ztpai.repositories.ClientRepository;
import com.example.ztpai.repositories.SaleRepository;
import com.example.ztpai.auth.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@RestController
@RequestMapping("/statistics")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class StatisticsController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/best-clients")
    public ResponseEntity<?> getBestClients(@RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));
            List<Client> clients = clientRepository.findAllByUser_Id(userId);
            List<Map<String, Object>> bestClients = new ArrayList<>();

            for (Client client : clients) {
                double totalSpent = 0.0;
                int numberOfSales = 0;
                Set<Sale> sales = saleRepository.findByClient(client);
                for (Sale sale : sales) {
                    double price = (sale.getProduct().getPrice() * ((100-client.getDiscount())/100));
                    price = Math.ceil(price * 100) / 100;
                    int quantity = sale.getQuantity();
                    totalSpent += price * quantity ;
                    numberOfSales++;
                }
                Map<String, Object> clientInfo = new HashMap<>();
                clientInfo.put("name", client.getName());
                clientInfo.put("surname", client.getSurname());
                clientInfo.put("totalSpent", Math.ceil(totalSpent * 100) / 100);
                clientInfo.put("numberOfSales", numberOfSales);
                bestClients.add(clientInfo);
            }
            bestClients.sort((a, b) -> Double.compare((Double) b.get("totalSpent"), (Double) a.get("totalSpent")));
            int numClientsToShow = Math.min(3, bestClients.size());
            List<Map<String, Object>> topClients = bestClients.subList(0, numClientsToShow);

            return ResponseEntity.ok(topClients);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred while fetching best clients.");
        }
    }

    @GetMapping("/clients-points")
    public ResponseEntity<?> getClientsPoints(@RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));

            List<Client> clients = clientRepository.findAllByUser_Id(userId);
            List<Map<String, Object>> clientsPoints = new ArrayList<>();

            LocalDate startDate = LocalDate.now().minusDays(60);
            Date startDateAsDate = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

            for (Client client : clients) {
                double totalPoints = 0.0;
                Set<Sale> sales = saleRepository.findByClient(client);
                for (Sale sale : sales) {
                    if (sale.getDate().after(startDateAsDate)) {
                        double points = sale.getProduct().getPoints();
                        points = Math.ceil(points * 1000.0) / 1000.0;
                        int quantity = sale.getQuantity();
                        totalPoints += points * quantity;
                    }
                }
                Map<String, Object> clientData = new HashMap<>();
                clientData.put("name", client.getName());
                clientData.put("surname", client.getSurname());
                clientData.put("email", client.getEmail());
                clientData.put("phone", client.getPhone_number());
                clientData.put("note", client.getNote());
                clientData.put("totalPoints", Math.ceil(totalPoints * 1000.0) / 1000.0);
                clientsPoints.add(clientData);
            }
            return ResponseEntity.ok(clientsPoints);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred while fetching clients points.");
        }
    }

    @GetMapping("/monthly-profit")
    public ResponseEntity<?> getMonthlyProfit(@RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtService.extractClaim(token.substring(7), claims -> claims.get("id", Integer.class));

            LocalDate startDate = LocalDate.now().minusDays(30);
            Date startDateAsDate = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            List<Client> clients = clientRepository.findAllByUser_Id(userId);

            double totalProfit = 0.0;
            for (Client client : clients) {
                Set<Sale> sales = saleRepository.findByClient(client);
                for (Sale sale : sales) {
                    if (sale.getDate().after(startDateAsDate) && sale.getDate().before(endDate)) {
                        double price = sale.getProduct().getPrice();
                        double discount = sale.getClient().getDiscount();
                        double saleProfit = (price - (price * (discount / 100))) * sale.getQuantity();
                        saleProfit = Math.ceil(saleProfit * 100) / 100;
                        totalProfit += saleProfit;
                    }
                }
            }

            Map<String, Object> profitData = new HashMap<>();
            profitData.put("totalProfit", Math.ceil(totalProfit * 100) / 100);

            return ResponseEntity.ok(profitData);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred while fetching monthly profit.");
        }
    }
}