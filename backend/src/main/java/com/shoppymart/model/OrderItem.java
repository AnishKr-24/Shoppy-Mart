package com.shoppymart.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderItem {

    private Object productId;
    private int quantity;

    public OrderItem() {
    }

    public OrderItem(Object productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Object getProductId() {
        return productId;
    }

    public void setProductId(Object productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
