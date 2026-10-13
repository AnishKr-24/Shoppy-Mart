package com.shoppymart.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private Object user;

    private List<OrderItem> products = new ArrayList<>();

    private double totalAmount;

    private Object address;

    private String paymentId;

    private String status = "pending";

    private Date createdAt = new Date();

    private Date updatedAt = new Date();

    public Order() {
    }

    public Order(Object user, List<OrderItem> products, double totalAmount, Object address, String paymentId, String status) {
        this.user = user;
        this.products = products != null ? products : new ArrayList<>();
        this.totalAmount = totalAmount;
        this.address = address;
        this.paymentId = paymentId;
        this.status = status != null ? status : "pending";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @JsonProperty("_id")
    public String getId() {
        return id;
    }

    @JsonProperty("_id")
    @JsonAlias("id")
    public void setId(String id) {
        this.id = id;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }

    public List<OrderItem> getProducts() {
        return products;
    }

    public void setProducts(List<OrderItem> products) {
        this.products = products;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Object getAddress() {
        return address;
    }

    public void setAddress(Object address) {
        this.address = address;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
