package com.shoppymart.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageResponse {

    private String message;
    private Boolean success;
    private Object order;

    public MessageResponse() {
    }

    public MessageResponse(String message) {
        this.message = message;
    }

    public MessageResponse(String message, Boolean success) {
        this.message = message;
        this.success = success;
    }

    public MessageResponse(String message, Object order) {
        this.message = message;
        this.order = order;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Object getOrder() {
        return order;
    }

    public void setOrder(Object order) {
        this.order = order;
    }
}
