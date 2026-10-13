package com.shoppymart.service;

import com.shoppymart.config.JwtUtil;
import com.shoppymart.dto.*;
import com.shoppymart.model.User;
import com.shoppymart.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail();
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("User already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getName(), email, hashedPassword, "user", false);
        User savedUser = userRepository.save(user);

        // Generate OTP and send email in background
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        emailService.sendEmail(email, "Email Verification OTP", "Your OTP for email verification is: " + otp);

        String token = jwtUtil.generateToken(savedUser.getId());
        return new AuthResponse(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole(), token);
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail();
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getId());
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), token);
    }

    public AuthResponse getProfile(User user) {
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), null, user.isVerified());
    }

    public AuthResponse updateProfile(User currentUser, UpdateProfileRequest request) {
        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            currentUser.setName(request.getName().trim());
        }
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            currentUser.setEmail(request.getEmail().trim().toLowerCase());
        }
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            currentUser.setPassword(passwordEncoder.encode(request.getPassword().trim()));
        }

        User updatedUser = userRepository.save(currentUser);
        String token = jwtUtil.generateToken(updatedUser.getId());
        return new AuthResponse(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail(), updatedUser.getRole(), token, updatedUser.isVerified());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserByAdmin(String id, UpdateUserAdminRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            user.setName(request.getName().trim());
        }
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            String newEmail = request.getEmail().trim().toLowerCase();
            Optional<User> existing = userRepository.findByEmailIgnoreCase(newEmail);
            if (existing.isPresent() && !existing.get().getId().equals(id)) {
                throw new IllegalArgumentException("Email already exists");
            }
            user.setEmail(newEmail);
        }
        if (request.getRole() != null) {
            String role = request.getRole().toLowerCase();
            if (!role.equals("user") && !role.equals("admin")) {
                throw new IllegalArgumentException("Invalid role");
            }
            user.setRole(role);
        }
        if (request.getVerified() != null) {
            user.setVerified(request.getVerified());
        }

        return userRepository.save(user);
    }

    public void deleteUserByAdmin(User currentAdmin, String id) {
        if (currentAdmin.getId().equals(id)) {
            throw new IllegalArgumentException("You cannot delete your own admin account");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(user);
    }
}
