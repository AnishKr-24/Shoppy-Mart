package com.shoppymart.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expirationMillis;

    public JwtUtil(
            @Value("${jwt.secret:your_jwt_secret_key_ashdjaksdsgjak_shoppy_mart_secure_key_2026_spring_boot}") String secret,
            @Value("${jwt.expiration:604800000}") long expirationMillis) {
        this.key = deriveKey(secret);
        this.expirationMillis = expirationMillis;
    }

    private SecretKey deriveKey(String secret) {
        try {
            // Derive a 256-bit SHA-256 hash so any arbitrary secret length produces a valid HMAC-SHA256 key
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(secret.getBytes(StandardCharsets.UTF_8));
            return Keys.hmacShaKeyFor(hash);
        } catch (NoSuchAlgorithmException e) {
            byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
            if (bytes.length < 32) {
                byte[] padded = new byte[32];
                System.arraycopy(bytes, 0, padded, 0, bytes.length);
                return Keys.hmacShaKeyFor(padded);
            }
            return Keys.hmacShaKeyFor(bytes);
        }
    }

    public String generateToken(String userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);

        return Jwts.builder()
                .claims(claims)
                .subject(userId)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        if (claims.get("id") != null) {
            return String.valueOf(claims.get("id"));
        }
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
