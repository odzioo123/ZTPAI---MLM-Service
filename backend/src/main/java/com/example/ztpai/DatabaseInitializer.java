package com.example.ztpai;

import com.example.ztpai.models.*;
import com.example.ztpai.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        UserType userType1 = new UserType();
        userType1.setName("User");

        UserType userType2 = new UserType();
        userType2.setName("Admin");

        userTypeRepository.saveAll(Set.of(userType1, userType2));

        User admin = new User();
        admin.setUserType(userType2);
        admin.setNick("Admin");
        admin.setEmail("admin@admin");
        admin.setPassword(passwordEncoder.encode("admin"));

        User user1 = new User();
        user1.setUserType(userType1);
        user1.setNick("User");
        user1.setEmail("user@user");
        user1.setPassword(passwordEncoder.encode("user"));

        User user2 = new User();
        user2.setUserType(userType1);
        user2.setNick("User2");
        user2.setEmail("user2@user2");
        user2.setPassword(passwordEncoder.encode("user2"));

        User user3 = new User();
        user3.setUserType(userType1);
        user3.setNick("odzioo");
        user3.setEmail("odzioo@gmail.com");
        user3.setPassword(passwordEncoder.encode("miecz"));

        User user4 = new User();
        user4.setUserType(userType1);
        user4.setNick("odzioo123");
        user4.setEmail("odzioo123@gmail.com");
        user4.setPassword(passwordEncoder.encode("123"));

        userRepository.saveAll(Set.of(admin, user1, user2, user3, user4));

        Client client1 = new Client();
        client1.setName("Aleksandra");
        client1.setSurname("Kowalska");
        client1.setDiscount(10.0);
        client1.setPhone_number("123 456 789");
        client1.setEmail("aleksandra.kowalska@example.com");
        client1.setUser(user1);

        Client client2 = new Client();
        client2.setName("Michał");
        client2.setSurname("Nowak");
        client2.setDiscount(5.0);
        client2.setPhone_number("234 567 890");
        client2.setEmail("michal.nowak@example.com");
        client2.setUser(user1);

        Client client3 = new Client();
        client3.setName("Anna");
        client3.setSurname("Wiśniewska");
        client3.setDiscount(10.0);
        client3.setPhone_number("345 678 901");
        client3.setEmail("anna.wisniewska@example.com");
        client3.setUser(user1);

        Client client4 = new Client();
        client4.setName("Piotr");
        client4.setSurname("Dąbrowski");
        client4.setDiscount(5.0);
        client4.setPhone_number("538 482 622");
        client4.setEmail("piotr.dabrowski@example.com");
        client4.setUser(user1);

        Client client5 = new Client();
        client5.setName("Karolina");
        client5.setSurname("Kowalczyk");
        client5.setDiscount(5.0);
        client5.setPhone_number("786 124 384");
        client5.setEmail("karolina.kowalczyk@example.com");
        client5.setUser(user1);

        Client client6 = new Client();
        client6.setName("Krzysztof");
        client6.setSurname("Jankowski");
        client6.setDiscount(5.0);
        client6.setPhone_number("694 438 630");
        client6.setEmail("krzysztof.jankowski@example.com");
        client6.setUser(user2);

        Client client7 = new Client();
        client7.setName("Magdalena");
        client7.setSurname("Woźniak");
        client7.setDiscount(15.0);
        client7.setPhone_number("786 065 088");
        client7.setEmail("magdalena.wozniak@example.com");
        client7.setUser(user2);

        Client client8 = new Client();
        client8.setName("Grzegorz");
        client8.setSurname("Kamiński");
        client8.setDiscount(20.0);
        client8.setPhone_number("884 568 467");
        client8.setEmail("grzegorz.kaminski@example.com");
        client8.setUser(user2);

        Client client9 = new Client();
        client9.setName("Jan");
        client9.setSurname("Nowakowski");
        client9.setDiscount(15.0);
        client9.setPhone_number("697 437 899");
        client9.setEmail("jan.nowakowski@example.com");
        client9.setUser(admin);

        Client client10 = new Client();
        client10.setName("Ewa");
        client10.setSurname("Kowalczyk");
        client10.setDiscount(10.0);
        client10.setPhone_number("515 858 575");
        client10.setEmail("ewa.kowalczyk@example.com");
        client10.setUser(admin);

        Client client11 = new Client();
        client11.setName("Andrzej");
        client11.setSurname("Duda");
        client11.setDiscount(20.0);
        client11.setPhone_number("693 949 927");
        client11.setEmail("andrzej.duda@example.com");
        client11.setUser(admin);

        Client client12 = new Client();
        client12.setName("Agnieszka");
        client12.setSurname("Kamińska");
        client12.setDiscount(25.0);
        client12.setPhone_number("724 201 463");
        client12.setEmail("agnieszka.kaminska@example.com");
        client12.setUser(admin);

        clientRepository.saveAll(Set.of(client1, client2, client3, client4, client5, client6, client7, client8,
                client9, client10, client11, client12));


        ProductType productType1 = new ProductType();
        productType1.setType("Drinks");
        ProductType productType2 = new ProductType();
        productType2.setType("Dietary Supplements");
        ProductType productType3 = new ProductType();
        productType3.setType("Bee Products");
        ProductType productType4 = new ProductType();
        productType4.setType("Weight and Figure Control");
        ProductType productType5 = new ProductType();
        productType5.setType("Infinite by Forever");
        ProductType productType6 = new ProductType();
        productType6.setType("Sonya Daily Skincare");
        ProductType productType7 = new ProductType();
        productType7.setType("Skin Care");
        ProductType productType8 = new ProductType();
        productType8.setType("Daily Care");
        ProductType productType9 = new ProductType();
        productType9.setType("Sets");
        ProductType productType10 = new ProductType();
        productType10.setType("Essential Oils");

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
