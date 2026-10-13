package com.shoppymart.service;

import com.shoppymart.dto.OrderCreateRequest;
import com.shoppymart.model.Order;
import com.shoppymart.model.OrderItem;
import com.shoppymart.model.Product;
import com.shoppymart.model.User;
import com.shoppymart.repository.OrderRepository;
import com.shoppymart.repository.ProductRepository;
import com.shoppymart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository,
                        ProductRepository productRepository,
                        EmailService emailService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.emailService = emailService;
    }

    public Order createOrder(User user, OrderCreateRequest request) {
        if (request.getProducts() == null || request.getProducts().isEmpty()
                || request.getTotalAmount() == null || request.getAddress() == null) {
            throw new IllegalArgumentException("Invalid order data");
        }

        Order order = new Order(
                user.getId(),
                request.getProducts(),
                request.getTotalAmount(),
                request.getAddress(),
                request.getPaymentId() != null ? request.getPaymentId() : "COD",
                "pending"
        );

        Order savedOrder = orderRepository.save(order);

        String emailText = String.format("""
                Dear %s,

                Thank you for your order!

                Your order has been successfully created with the following details:

                Order ID: %s
                Total Amount: $%.2f
                Shipping Address: %s

                We will notify you once your order is shipped.

                Best regards,
                ShopNest Team
                """, user.getName(), savedOrder.getId(), savedOrder.getTotalAmount(), String.valueOf(savedOrder.getAddress()));

        emailService.sendEmail(user.getEmail(), "Order Created", emailText);

        return savedOrder;
    }

    public List<Order> getMyOrders(User user) {
        List<Order> orders = orderRepository.findByUserId(user.getId());
        for (Order order : orders) {
            populateProducts(order);
        }
        return orders;
    }

    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            populateUser(order);
            populateProducts(order);
        }
        return orders;
    }

    public Order getOrderById(String orderId, User currentUser) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        String orderUserId = extractUserId(order.getUser());
        boolean isAdmin = currentUser.getRole() != null && currentUser.getRole().equalsIgnoreCase("admin");

        if (!orderUserId.equals(currentUser.getId()) && !isAdmin) {
            throw new SecurityException("Not authorized to view this order");
        }

        populateUser(order);
        populateProducts(order);
        return order;
    }

    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        order.setStatus(status);
        order.setUpdatedAt(new Date());
        return orderRepository.save(order);
    }

    private String extractUserId(Object userObj) {
        if (userObj instanceof String) {
            return (String) userObj;
        } else if (userObj instanceof Map<?, ?> map) {
            Object id = map.get("_id");
            if (id == null) id = map.get("id");
            return id != null ? id.toString() : "";
        }
        return "";
    }

    private void populateUser(Order order) {
        String userId = extractUserId(order.getUser());
        if (!userId.isEmpty()) {
            userRepository.findById(userId).ifPresent(u -> {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("_id", u.getId());
                userMap.put("name", u.getName());
                userMap.put("email", u.getEmail());
                order.setUser(userMap);
            });
        }
    }

    private void populateProducts(Order order) {
        if (order.getProducts() == null) return;

        for (OrderItem item : order.getProducts()) {
            Object prodIdObj = item.getProductId();
            String prodId = null;
            if (prodIdObj instanceof String) {
                prodId = (String) prodIdObj;
            } else if (prodIdObj instanceof Map<?, ?> map) {
                Object id = map.get("_id");
                if (id == null) id = map.get("id");
                prodId = id != null ? id.toString() : null;
            }

            if (prodId != null) {
                Optional<Product> prodOpt = productRepository.findById(prodId);
                if (prodOpt.isPresent()) {
                    Product p = prodOpt.get();
                    Map<String, Object> prodMap = new HashMap<>();
                    prodMap.put("_id", p.getId());
                    prodMap.put("name", p.getName());
                    prodMap.put("price", p.getPrice());
                    prodMap.put("imageUrl", p.getImageUrl());
                    item.setProductId(prodMap);
                }
            }
        }
    }
}
