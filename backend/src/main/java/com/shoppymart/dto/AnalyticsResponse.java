package com.shoppymart.dto;

public class AnalyticsResponse {

    private long totalOrders;
    private long totalProducts;
    private long totalUsers;
    private double totalRevenue;

    public AnalyticsResponse() {
    }

    public AnalyticsResponse(long totalOrders, long totalProducts, long totalUsers, double totalRevenue) {
        this.totalOrders = totalOrders;
        this.totalProducts = totalProducts;
        this.totalUsers = totalUsers;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
