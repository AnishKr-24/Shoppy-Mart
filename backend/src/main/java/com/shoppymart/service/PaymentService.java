package com.shoppymart.service;

import com.razorpay.RazorpayClient;
import com.shoppymart.dto.PaymentVerifyRequest;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final String keyId;
    private final String keySecret;

    public PaymentService(
            @Value("${razorpay.key-id:}") String keyId,
            @Value("${razorpay.key-secret:}") String keySecret) {
        this.keyId = keyId;
        this.keySecret = keySecret;
    }

    public Map<String, Object> createOrder(double amount) {
        int amountInPaise = (int) Math.round(amount * 100);
        String receiptId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);

        if (keyId != null && !keyId.trim().isEmpty() && keySecret != null && !keySecret.trim().isEmpty()) {
            try {
                RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
                JSONObject orderRequest = new JSONObject();
                orderRequest.put("amount", amountInPaise);
                orderRequest.put("currency", "INR");
                orderRequest.put("receipt", receiptId);

                com.razorpay.Order order = razorpay.orders.create(orderRequest);
                Map<String, Object> response = new HashMap<>();
                response.put("id", order.get("id"));
                response.put("amount", order.get("amount"));
                response.put("currency", order.get("currency"));
                response.put("receipt", order.get("receipt"));
                response.put("status", order.get("status"));
                return response;
            } catch (Exception e) {
                logger.warn("Razorpay API error, falling back to simulated order: {}", e.getMessage());
            }
        }

        // Development/Demo fallback order
        Map<String, Object> mockOrder = new HashMap<>();
        mockOrder.put("id", "order_mock_" + UUID.randomUUID().toString().substring(0, 8));
        mockOrder.put("amount", amountInPaise);
        mockOrder.put("currency", "INR");
        mockOrder.put("receipt", receiptId);
        mockOrder.put("status", "created");
        return mockOrder;
    }

    public boolean verifyPayment(PaymentVerifyRequest request) {
        String orderId = request.getRazorpayOrderId();
        String paymentId = request.getRazorpayPaymentId();
        String signature = request.getRazorpaySignature();

        if (orderId == null || paymentId == null) {
            return false;
        }

        if (keySecret == null || keySecret.trim().isEmpty()) {
            // In development without real keys, consider simulation valid if signature is non-empty
            return signature != null && !signature.isEmpty();
        }

        try {
            String payload = orderId + "|" + paymentId;
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            byte[] hash = sha256_HMAC.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString().equals(signature);
        } catch (Exception e) {
            logger.error("Error during payment verification: {}", e.getMessage());
            return false;
        }
    }
}
