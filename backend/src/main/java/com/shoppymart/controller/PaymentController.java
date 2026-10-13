package com.shoppymart.controller;

import com.shoppymart.dto.PaymentOrderRequest;
import com.shoppymart.dto.PaymentVerifyRequest;
import com.shoppymart.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/order")
    public ResponseEntity<?> createPaymentOrder(@RequestBody PaymentOrderRequest request) {
        try {
            double amount = request.getAmount() != null ? request.getAmount() : 0.0;
            Map<String, Object> order = paymentService.createOrder(amount);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Server error"));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerifyRequest request) {
        try {
            boolean isValid = paymentService.verifyPayment(request);
            if (!isValid) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("success", false, "message", "Payment verification failed"));
            }
            return ResponseEntity.ok(Map.of("success", true, "message", "Payment verified successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Server error", "error", e.getMessage()));
        }
    }
}
