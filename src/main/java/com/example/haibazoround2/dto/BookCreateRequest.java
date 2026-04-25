package com.example.haibazoround2.dto;

import lombok.Data;

@Data
public class BookCreateRequest {
    private String title;
    private Long authorId;
}
