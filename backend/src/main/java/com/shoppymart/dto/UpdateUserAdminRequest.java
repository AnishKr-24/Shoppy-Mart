package com.shoppymart.dto;

public class UpdateUserAdminRequest {

    private String name;
    private String email;
    private String role;
    private Boolean verified;

    public UpdateUserAdminRequest() {
    }

    public UpdateUserAdminRequest(String name, String email, String role, Boolean verified) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.verified = verified;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }
}
