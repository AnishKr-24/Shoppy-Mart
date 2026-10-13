package com.shoppymart.seed;

import com.shoppymart.model.Product;
import com.shoppymart.model.User;
import com.shoppymart.repository.ProductRepository;
import com.shoppymart.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            seedUsers();
            seedProducts();
        } catch (Exception e) {
            logger.warn("Database seeder encountered an issue (is MongoDB running?): {}", e.getMessage());
        }
    }

    private void seedUsers() {
        String adminEmail = "admin@shoppymart.com";
        if (userRepository.findByEmailIgnoreCase(adminEmail).isEmpty()) {
            User admin = new User(
                    "Admin User",
                    adminEmail,
                    passwordEncoder.encode("admin123"),
                    "admin",
                    true
            );
            userRepository.save(admin);
            logger.info("Admin user created successfully (email: admin@shoppymart.com, password: admin123)");
        }

        String customerEmail = "user@shoppymart.com";
        if (userRepository.findByEmailIgnoreCase(customerEmail).isEmpty()) {
            User customer = new User(
                    "Demo Customer",
                    customerEmail,
                    passwordEncoder.encode("user123"),
                    "user",
                    true
            );
            userRepository.save(customer);
            logger.info("Demo customer user created successfully (email: user@shoppymart.com, password: user123)");
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                    // Category 1: Staples & Flour
                    new Product("Aashirvaad Shudh Chakki Whole Wheat Atta 10kg",
                            "100% pure whole wheat flour processed with traditional chakki process. Retains natural dietary fibers and nutrients for soft, delicious rotis.",
                            449, "Staples & Flour", 100,
                            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop", 4.9, 320),
                    new Product("Fortune Superfine Maida 1kg",
                            "Hygienically milled and refined wheat flour. Ideal for baking fresh naan, samosas, cakes, and delicious pastries.",
                            52, "Staples & Flour", 90,
                            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop", 4.7, 140),
                    new Product("Rajdhani Premium Besan / Gram Flour 1kg",
                            "100% pure chana dal besan with rich aroma and fine texture. Perfect for pakoras, dhokla, and traditional Indian sweets.",
                            110, "Staples & Flour", 85,
                            "https://images.unsplash.com/photo-1627662168806-efa33a7cce86?w=600&auto=format&fit=crop", 4.8, 210),

                    // Category 2: Rice & Grains
                    new Product("India Gate Super Premium Basmati Rice 5kg",
                            "Extra long grain aromatic basmati rice aged to perfection. Perfect for biryani, pulao, and festive Indian meals.",
                            699, "Rice & Grains", 80,
                            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop", 4.8, 240),
                    new Product("Fortune Everyday Basmati Rice 1kg",
                            "Aromatic fluffy basmati rice for everyday family meals. Fluffy non-sticky grains that swell up beautifully.",
                            115, "Rice & Grains", 120,
                            "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop", 4.6, 165),
                    new Product("Daawat Rozana Super Basmati Rice 5kg",
                            "Well-aged basmati rice with distinctive aroma and rich texture. Ideal for fried rice, lemon rice, and daily meals.",
                            480, "Rice & Grains", 70,
                            "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop", 4.7, 190),

                    // Category 3: Edible Oils & Ghee
                    new Product("Fortune Sunlite Refined Sunflower Oil 5L Jar",
                            "Light, healthy, and easy to digest refined sunflower oil enriched with Vitamin A & D. Ideal for daily Indian cooking and deep frying.",
                            749, "Edible Oils & Ghee", 60,
                            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop", 4.7, 195),
                    new Product("Amul Pure Cow Ghee 1L Tin",
                            "Traditional granular cow ghee crafted from fresh cream. Delivers authentic aroma and rich flavor to sweets, dals, and parathas.",
                            615, "Edible Oils & Ghee", 75,
                            "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop", 4.9, 410),
                    new Product("Dhara Kachi Ghani Mustard Oil 1L Pouch",
                            "Pungent cold-pressed mustard oil rich in natural Omega-3. Essential for authentic North Indian curries and pickles.",
                            165, "Edible Oils & Ghee", 110,
                            "https://images.unsplash.com/photo-1620706857370-e1b993a58c34?w=600&auto=format&fit=crop", 4.8, 280),

                    // Category 4: Spices & Masalas
                    new Product("Everest Royal Garam Masala & Turmeric Combo (400g)",
                            "Authentic blend of ground spices and pure golden turmeric with natural oils intact. Enhances aroma and color of curry dishes.",
                            195, "Spices & Masalas", 120,
                            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop", 4.8, 180),
                    new Product("Tata Salt Vacuum Evaporated Iodized Salt 1kg",
                            "Desh ka Namak - India's most trusted vacuum-evaporated iodized salt ensuring mental development and daily health.",
                            28, "Spices & Masalas", 200,
                            "https://images.unsplash.com/photo-1518110165389-d91e6bfa414a?w=600&auto=format&fit=crop", 4.9, 530),
                    new Product("MDH Deggi Mirch Red Chilli Powder 100g",
                            "Vibrant red chilli powder blend imparting rich natural red color and moderate spice level without overpowering heat.",
                            85, "Spices & Masalas", 150,
                            "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop", 4.8, 310),

                    // Category 5: Dairy & Bakery
                    new Product("Amul Taaza Toned Milk 1L (Pack of 6)",
                            "Long-life UHT pasteurized toned milk enriched with Vitamin A & D. No preservatives needed; ready to drink or cook.",
                            432, "Dairy & Bakery", 70,
                            "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop", 4.9, 290),
                    new Product("Amul Butter Pasteurized 500g Pack",
                            "Utterly butterly delicious pasteurized butter made from wholesome cow and buffalo milk cream. Ideal for toast and cooking.",
                            275, "Dairy & Bakery", 95,
                            "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop", 4.9, 480),
                    new Product("Britannia Daily Fresh Paneer 200g",
                            "Soft, fresh cottage cheese rich in protein and calcium. Perfect for shahi paneer, tikka, and matar paneer.",
                            95, "Dairy & Bakery", 80,
                            "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop", 4.7, 210),

                    // Category 6: Beverages & Tea
                    new Product("Brooke Bond Taj Mahal Premium Tea 500g",
                            "Wah Taj! Exquisite tea leaves selection providing fine strength, rich golden color, and matchless aroma for tea lovers.",
                            385, "Beverages & Tea", 90,
                            "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop", 4.8, 310),
                    new Product("Nescafé Classic Instant Coffee 200g Jar",
                            "100% pure natural coffee beans roasted to perfection. Delivers bold coffee flavor and uplifting morning energy.",
                            610, "Beverages & Tea", 65,
                            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop", 4.8, 390),
                    new Product("Red Label Natural Care Tea 1kg Pack",
                            "Enriched tea with Ayurvedic herbs including Tulsi, Ginger, Cardamom, Mulethi, and Ashwagandha for immunity.",
                            540, "Beverages & Tea", 85,
                            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop", 4.9, 275),

                    // Category 7: Snacks & Sweets
                    new Product("Haldiram's Nagpur Special Bhujia Sev 1kg",
                            "Crispy and spicy moth pulse and gram flour bhujia snack. Made with traditional Indian spices for teatime munching.",
                            290, "Snacks & Sweets", 110,
                            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop", 4.7, 220),
                    new Product("Bikanervala Soan Papdi Premium 500g",
                            "Flaky and melt-in-mouth traditional Indian sweet made with cardamom, pistachios, and pure ghee.",
                            160, "Snacks & Sweets", 100,
                            "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop", 4.8, 180),
                    new Product("Bikaji Aslee Bikaner Rasgulla 1kg Tin",
                            "Soft and spongy cottage cheese balls soaked in fragrant sugar syrup. Authentic Bikaner dessert recipe.",
                            240, "Snacks & Sweets", 75,
                            "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop", 4.9, 320),

                    // Category 8: Pulses & Dals
                    new Product("Tata Sampann Unpolished Toor Dal / Arhar Dal 1kg",
                            "Unpolished toor dal rich in natural protein without any artificial polish or water treatment. Wholesome and easy to cook.",
                            165, "Pulses & Dals", 85,
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop", 4.8, 175),
                    new Product("Fortune Premium Chana Dal 1kg",
                            "Unpolished golden chana dal packed with plant-based protein and dietary fiber. Delicious for tadka dal and vada.",
                            125, "Pulses & Dals", 90,
                            "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop", 4.7, 145),
                    new Product("Organic Tattva Moong Dal Split 1kg",
                            "Certified organic split green gram moong dal. Easily digestible, light on stomach, and rich in essential minerals.",
                            180, "Pulses & Dals", 70,
                            "https://images.unsplash.com/photo-1585994191611-726cef558607?w=600&auto=format&fit=crop", 4.9, 260)
            );

            productRepository.saveAll(products);
            logger.info("Successfully seeded {} grocery products across 8 categories!", products.size());
        }
    }
}
