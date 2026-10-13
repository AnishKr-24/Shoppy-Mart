package com.shoppymart.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.shoppymart.model.OrderItem;

import java.util.List;

public class OrderCreateRequest {

    @JsonAlias("items")
    private List<OrderItem> products;

    private Double totalAmount;
    private Object address;
    private String paymentId;

    public OrderCreateRequest() {
    }

    public OrderCreateRequest(List<OrderItem> products, Double totalAmount, Object address, String paymentId) {
        this.products = products;
        this.totalAmount = totalAmount;
        this.address = address;
        this.paymentId = paymentId;
    }

    public List<OrderItem> getProducts() {
        return products;
    }

    public void setProducts(List<OrderItem> products) {
        this.products = products;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
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
}
