package com.example.haibazoround2.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long id;
    private String bookTitle;
    private String authorName;
    private String content;
}
