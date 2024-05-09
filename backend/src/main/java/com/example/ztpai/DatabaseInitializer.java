package com.example.ztpai;

import com.example.ztpai.models.Product;
import com.example.ztpai.models.ProductType;
import com.example.ztpai.models.UserType;
import com.example.ztpai.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@AllArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {
    private UserTypeRepository userTypeRepository;
    private ProductTypeRepository productTypeRepository;
    private UserRepository userRepository;
    private NotificationRepository notificationRepository;
    private ClientRepository clientRepository;
    private SaleRepository saleRepository;
    private ProductRepository productRepository;


    @Override
    public void run(String... args) {

        UserType userType1 = new UserType();
        userType1.setName("User");

        UserType userType2 = new UserType();
        userType2.setName("Admin");

        userTypeRepository.saveAll(Set.of(userType1, userType2));

        ProductType productType1 = new ProductType();
        productType1.setType("Drinks");
        ProductType productType2 = new ProductType();
        productType2.setType("Dietary Supplements");
        ProductType productType3 = new ProductType();
        productType2.setType("Bee Products");
        ProductType productType4 = new ProductType();
        productType2.setType("Weight and Figure Control");
        ProductType productType5 = new ProductType();
        productType2.setType("Infinite by Forever");
        ProductType productType6 = new ProductType();
        productType2.setType("Sonya Daily Skincare");
        ProductType productType7 = new ProductType();
        productType2.setType("Skin Care");
        ProductType productType8 = new ProductType();
        productType2.setType("Daily Care");
        ProductType productType9 = new ProductType();
        productType2.setType("Sets");
        ProductType productType10 = new ProductType();
        productType2.setType("Essential Oils");

        // Save product types
        productTypeRepository.saveAll(Set.of(productType1, productType2, productType3, productType4, productType5, productType6,
                productType7, productType8, productType9, productType10));

        Set<ProductType> productTypes1 = new HashSet<>();
        productTypes1.add(productType1);

        Set<ProductType> productTypes2 = new HashSet<>();
        productTypes1.add(productType2);

        Product product1 = new Product();
        product1.setCode(715);
        product1.setName("Forever Aloe Vera Gel");
        product1.setPrice(160.45);
        product1.setPoints(0.101);
        product1.setProductType(productTypes1);

        Product product2 = new Product();
        product2.setCode(7153);
        product2.setName("Tripak Forever Aloe Vera Gel");
        product2.setPrice(481.32);
        product2.setPoints(0.303);
        product2.setProductType(productTypes1);

        Product product3 = new Product();
        product3.setCode(71612);
        product3.setName("Forever Aloe Vera Gel mini");
        product3.setPrice(641.91);
        product3.setPoints(0.449);
        product3.setProductType(productTypes1);

        Product product4 = new Product();
        product4.setCode(734);
        product4.setName("Forever Aloe Berry Nectar");
        product4.setPrice(160.45);
        product4.setPoints(0.101);
        product4.setProductType(productTypes1);

        Product product5 = new Product();
        product5.setCode(37);
        product5.setName("Forever Nature-Min");
        product5.setPrice(98.86);
        product5.setPoints(0.073);
        product5.setProductType(productTypes2);

        Product product6 = new Product();
        product6.setCode(48);
        product6.setName("Forever Absorbent-C");
        product6.setPrice(94.80);
        product6.setPoints(0.070);
        product6.setProductType(productTypes2);

        Product product7 = new Product();
        product7.setCode(65);
        product7.setName("Forever Garlic-Thyme");
        product7.setPrice(98.86);
        product7.setPoints(0.073);
        product7.setProductType(productTypes2);

        Product product8 = new Product();
        product8.setCode(68);
        product8.setName("Forever Fields of Greens");
        product8.setPrice(65.01);
        product8.setPoints(0.048);
        product8.setProductType(productTypes2);

        productRepository.saveAll(Set.of(product1, product2, product3, product4, product5, product6, product7, product8));

    }
}
