package com.shoppymart.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);

    private final Cloudinary cloudinary;
    private final String uploadDir;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name:}") String cloudName,
            @Value("${cloudinary.api-key:}") String apiKey,
            @Value("${cloudinary.api-secret:}") String apiSecret,
            @Value("${app.upload.dir:uploads}") String uploadDir) {

        this.uploadDir = uploadDir;

        if (cloudName != null && !cloudName.isEmpty() && apiKey != null && !apiKey.isEmpty() && apiSecret != null && !apiSecret.isEmpty()) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret,
                    "secure", true
            ));
        } else {
            this.cloudinary = null;
        }

        // Ensure upload directory exists
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            logger.warn("Could not create local upload directory: {}", e.getMessage());
        }
    }

    public String uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // Try Cloudinary if configured
        if (cloudinary != null) {
            try {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                Object secureUrl = uploadResult.get("secure_url");
                if (secureUrl != null) {
                    return secureUrl.toString();
                }
            } catch (Exception e) {
                logger.warn("Cloudinary upload failed, falling back to local file storage: {}", e.getMessage());
            }
        }

        // Fallback to local storage in uploads/ directory
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFilename = UUID.randomUUID().toString() + extension;
            Path destination = Paths.get(uploadDir).resolve(newFilename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + newFilename;
        } catch (IOException e) {
            logger.error("Failed to save local image: {}", e.getMessage());
            return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop";
        }
    }
}
