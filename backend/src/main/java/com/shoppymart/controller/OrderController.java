package com.shoppymart.controller;

import com.shoppymart.dto.MessageResponse;
import com.shoppymart.dto.OrderCreateRequest;
import com.shoppymart.dto.UpdateOrderStatusRequest;
import com.shoppymart.model.Order;
import com.shoppymart.model.User;
import com.shoppymart.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@AuthenticationPrincipal User user, @RequestBody OrderCreateRequest request) {
        try {
            Order order = orderService.createOrder(user, request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Order created successfully", "order", order));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error creating order", "error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error fetching orders", "error", e.getMessage()));
        }
    }

    @GetMapping("/myorders")
    public ResponseEntity<?> getMyOrders(@AuthenticationPrincipal User user) {
        try {
            List<Order> orders = orderService.getMyOrders(user);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error fetching orders", "error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id, @AuthenticationPrincipal User user) {
        try {
            Order order = orderService.getOrderById(id, user);
            return ResponseEntity.ok(order);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error fetching order", "error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestBody UpdateOrderStatusRequest request) {
        try {
            Order order = orderService.updateOrderStatus(id, request.getStatus());
            return ResponseEntity.ok(Map.of("message", "order status updated", "order", order));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error updating order status", "error", e.getMessage()));
        }
    }
}
