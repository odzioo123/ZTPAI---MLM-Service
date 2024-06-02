package com.example.ztpai;

import com.example.ztpai.models.*;
import com.example.ztpai.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
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

        productTypeRepository.saveAll(Set.of(productType1, productType2, productType3, productType4, productType5,
                productType6, productType7, productType8, productType9, productType10));

        Product product1 = new Product();
        product1.setCode(715);
        product1.setName("Forever Aloe Vera Gel");
        product1.setPrice(160.45);
        product1.setPoints(0.101);
        product1.setProductType(List.of(productType1));

        Product product2 = new Product();
        product2.setCode(7153);
        product2.setName("Tripak Forever Aloe Vera Gel");
        product2.setPrice(481.32);
        product2.setPoints(0.303);
        product2.setProductType(List.of(productType1));

        Product product3 = new Product();
        product3.setCode(71612);
        product3.setName("Forever Aloe Vera Gel mini");
        product3.setPrice(641.91);
        product3.setPoints(0.449);
        product3.setProductType(List.of(productType1));

        Product product4 = new Product();
        product4.setCode(734);
        product4.setName("Forever Aloe Berry Nectar");
        product4.setPrice(160.45);
        product4.setPoints(0.101);
        product4.setProductType(List.of(productType1));

        Product product5 = new Product();
        product5.setCode(777);
        product5.setName("Forever Aloe Peaches");
        product5.setPrice(160.45);
        product5.setPoints(0.101);
        product5.setProductType(List.of(productType1));

        Product product6 = new Product();
        product6.setCode(7773);
        product6.setName("Tripak Forever Aloe Peaches");
        product6.setPrice(481.32);
        product6.setPoints(0.303);
        product6.setProductType(List.of(productType1));

        Product product7 = new Product();
        product7.setCode(736);
        product7.setName("Forever Aloe Mango");
        product7.setPrice(160.45);
        product7.setPoints(0.101);
        product7.setProductType(List.of(productType1));

        Product product8 = new Product();
        product8.setCode(37);
        product8.setName("Forever Nature-Min");
        product8.setPrice(98.86);
        product8.setPoints(0.073);
        product8.setProductType(List.of(productType2));

        Product product9 = new Product();
        product9.setCode(48);
        product9.setName("Forever Absorbent-C");
        product9.setPrice(94.80);
        product9.setPoints(0.070);
        product9.setProductType(List.of(productType2));

        Product product10 = new Product();
        product10.setCode(65);
        product10.setName("Forever Garlic-Thyme");
        product10.setPrice(98.86);
        product10.setPoints(0.073);
        product10.setProductType(List.of(productType2));

        Product product11 = new Product();
        product11.setCode(68);
        product11.setName("Forever Fields of Greens");
        product11.setPrice(65.01);
        product11.setPoints(0.048);
        product11.setProductType(List.of(productType2));

        Product product12 = new Product();
        product12.setCode(26);
        product12.setName("Forever Bee Pollen 100 tablets");
        product12.setPrice(82.61);
        product12.setPoints(0.061);
        product12.setProductType(List.of(productType3));

        Product product13 = new Product();
        product13.setCode(27);
        product13.setName("Forever Bee Propolis 60 tablets");
        product13.setPrice(172.0);
        product13.setPoints(0.127);
        product13.setProductType(List.of(productType3));

        Product product14 = new Product();
        product14.setCode(36);
        product14.setName("Forever Royal Jelly 60 tablets");
        product14.setPrice(178.77);
        product14.setPoints(0.132);
        product14.setProductType(List.of(productType3));

        Product product15 = new Product();
        product15.setCode(207);
        product15.setName("Forever Bee Honey 0,5kg");
        product15.setPrice(88.22);
        product15.setPoints(0.067);
        product15.setProductType(List.of(productType3));

        Product product16 = new Product();
        product16.setCode(71);
        product16.setName("Forever Garcinia Plus 70 capsules");
        product16.setPrice(178.77);
        product16.setPoints(0.132);
        product16.setProductType(List.of(productType4));

        Product product17 = new Product();
        product17.setCode(289);
        product17.setName("Forever Lean 120 capsules");
        product17.setPrice(185.54);
        product17.setPoints(0.137);
        product17.setProductType(List.of(productType4));

        Product product18 = new Product();
        product18.setCode(463);
        product18.setName("Forever Therm 60 tablets");
        product18.setPrice(188.25);
        product18.setPoints(0.139);
        product18.setProductType(List.of(productType4));

        Product product19 = new Product();
        product19.setCode(470);
        product19.setName("Forever Lite Ultra | vanilla 375g");
        product19.setPrice(135.43);
        product19.setPoints(0.100);
        product19.setProductType(List.of(productType4));

        Product product20 = new Product();
        product20.setCode(471);
        product20.setName("Forever Lite Ultra | chocolate 390g");
        product20.setPrice(154.24);
        product20.setPoints(0.100);
        product20.setProductType(List.of(productType4));

        productRepository.saveAll(List.of(product1, product2, product3, product4, product5, product6, product7, product8,
                product9, product10, product11, product12, product13, product14, product15, product16, product17, product18
                , product19, product20));


//         Sales for client1
        Sale sale1 = new Sale();
        sale1.setQuantity(2);
        sale1.setNote("First Sale for client1");
        sale1.setProduct(product1);
        sale1.setClient(client1);

        Sale sale2 = new Sale();
        sale2.setQuantity(1);
        sale2.setNote("Second Sale for client1");
        sale2.setProduct(product2);
        sale2.setClient(client1);

        // Sales for client2
        Sale sale3 = new Sale();
        sale3.setQuantity(3);
        sale3.setNote("First Sale for client2");
        sale3.setProduct(product3);
        sale3.setClient(client2);

        Sale sale4 = new Sale();
        sale4.setQuantity(5);
        sale4.setNote("Second Sale for client2");
        sale4.setProduct(product4);
        sale4.setClient(client2);

        Sale sale5 = new Sale();
        sale5.setQuantity(4);
        sale5.setNote("Third Sale for client2");
        sale5.setProduct(product5);
        sale5.setClient(client2);

        Sale sale6 = new Sale();
        sale6.setQuantity(2);
        sale6.setNote("Fourth Sale for client2");
        sale6.setProduct(product6);
        sale6.setClient(client2);

        // Sales for client3
        Sale sale7 = new Sale();
        sale7.setQuantity(1);
        sale7.setNote("First Sale for client3");
        sale7.setProduct(product7);
        sale7.setClient(client3);

        Sale sale8 = new Sale();
        sale8.setQuantity(2);
        sale8.setNote("Second Sale for client3");
        sale8.setProduct(product8);
        sale8.setClient(client3);

        Sale sale9 = new Sale();
        sale9.setQuantity(1);
        sale9.setNote("Third Sale for client3");
        sale9.setProduct(product9);
        sale9.setClient(client3);

        // Sale for client4
        Sale sale10 = new Sale();
        sale10.setQuantity(3);
        sale10.setNote("First Sale for client4");
        sale10.setProduct(product10);
        sale10.setClient(client4);

        saleRepository.saveAll(Set.of(sale1, sale2, sale3, sale4, sale5, sale6, sale7, sale8, sale9, sale10));

    }
}
