package com.example.haibazoround2.dto;

import lombok.Data;

@Data
public class ReviewCreateRequest {
    private Long bookId;
    private String content;
}
