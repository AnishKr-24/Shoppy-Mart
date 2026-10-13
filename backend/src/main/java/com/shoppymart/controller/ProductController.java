package com.shoppymart.controller;

import com.shoppymart.dto.ProductRequest;
import com.shoppymart.model.Product;
import com.shoppymart.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Product Not Found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Server error"));
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createProductJson(@RequestBody ProductRequest request) {
        try {
            Product product = productService.createProduct(request, null);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage() != null ? e.getMessage() : "Server error"));
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProductMultipart(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam("stock") Integer stock,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            ProductRequest request = new ProductRequest(name, description, price, category, stock, imageUrl);
            Product product = productService.createProduct(request, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage() != null ? e.getMessage() : "Server error"));
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateProductJson(@PathVariable String id, @RequestBody ProductRequest request) {
        try {
            Product updated = productService.updateProduct(id, request, null);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Product Not Found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Server error"));
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProductMultipart(
            @PathVariable String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) Double price,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "stock", required = false) Integer stock,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            ProductRequest request = new ProductRequest(name, description, price, category, stock, imageUrl);
            Product updated = productService.updateProduct(id, request, imageFile);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Product Not Found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Server error"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(Map.of("message", "Product removed"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Product not found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Server error"));
        }
    }
}
