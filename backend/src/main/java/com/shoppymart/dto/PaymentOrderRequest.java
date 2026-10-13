package com.shoppymart.dto;

public class PaymentOrderRequest {

    private Double amount;

    public PaymentOrderRequest() {
    }

    public PaymentOrderRequest(Double amount) {
        this.amount = amount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
