package com.shoppymart.service;

import com.shoppymart.dto.ProductRequest;
import com.shoppymart.model.Product;
import com.shoppymart.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;

    private static final String DEFAULT_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop";

    public ProductService(ProductRepository productRepository, CloudinaryService cloudinaryService) {
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product Not Found"));
    }

    public Product createProduct(ProductRequest request, MultipartFile imageFile) {
        String imageUrl = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            imageUrl = cloudinaryService.uploadImage(imageFile);
        }
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            imageUrl = request.getImageUrl();
        }
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            imageUrl = DEFAULT_IMAGE;
        }

        Product product = new Product(
                request.getName(),
                request.getDescription(),
                request.getPrice() != null ? request.getPrice() : 0.0,
                request.getCategory(),
                request.getStock() != null ? request.getStock() : 0,
                imageUrl,
                0.0,
                0
        );

        return productRepository.save(product);
    }

    public Product updateProduct(String id, ProductRequest request, MultipartFile imageFile) {
        Product product = getProductById(id);

        if (request.getName() != null) {
            product.setName(request.getName());
        }
        if (request.getDescription() != null) {
            product.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }
        if (request.getCategory() != null) {
            product.setCategory(request.getCategory());
        }
        if (request.getStock() != null) {
            product.setStock(request.getStock());
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadedUrl = cloudinaryService.uploadImage(imageFile);
            if (uploadedUrl != null) {
                product.setImageUrl(uploadedUrl);
            }
        } else if (request.getImageUrl() != null && !request.getImageUrl().trim().isEmpty()) {
            product.setImageUrl(request.getImageUrl().trim());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
