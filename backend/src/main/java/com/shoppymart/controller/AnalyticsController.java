package com.shoppymart.controller;

import com.shoppymart.dto.AnalyticsResponse;
import com.shoppymart.model.Order;
import com.shoppymart.repository.OrderRepository;
import com.shoppymart.repository.ProductRepository;
import com.shoppymart.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public AnalyticsController(OrderRepository orderRepository,
                               ProductRepository productRepository,
                               UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalyticsSummary() {
        long totalOrders = orderRepository.count();
        long totalProducts = productRepository.count();
        long totalUsers = userRepository.count();

        List<Order> orders = orderRepository.findAll();
        double totalRevenue = orders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();

        AnalyticsResponse response = new AnalyticsResponse(totalOrders, totalProducts, totalUsers, totalRevenue);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sales")
    public ResponseEntity<?> getSalesAnalytics() {
        return ResponseEntity.ok(Map.of("message", "Sales analytics data"));
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProductAnalytics() {
        return ResponseEntity.ok(Map.of("message", "Product analytics data"));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUserAnalytics() {
        return ResponseEntity.ok(Map.of("message", "User analytics data"));
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueAnalytics() {
        return ResponseEntity.ok(Map.of("message", "Revenue analytics data"));
    }
}
