package com.example.haibazoround2.controller;

import com.example.haibazoround2.dto.ReviewCreateRequest;
import com.example.haibazoround2.dto.ReviewDTO;
import com.example.haibazoround2.model.Book;
import com.example.haibazoround2.model.Review;
import com.example.haibazoround2.repository.BookRepository;
import com.example.haibazoround2.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public Page<ReviewDTO> getReviews(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "5") int size) {
        return reviewRepository.findAll(PageRequest.of(page, size))
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setId(review.getId());
                    if (review.getBook() != null) {
                        dto.setBookTitle(review.getBook().getTitle());
                        if (review.getBook().getAuthor() != null) {
                            dto.setAuthorName(review.getBook().getAuthor().getName());
                        }
                    }
                    dto.setContent(review.getContent());
                    return dto;
                });
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewCreateRequest request) {
        if (request.getContent() == null || request.getContent().trim().isEmpty() || request.getBookId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Book book = bookRepository.findById(request.getBookId()).orElse(null);
        if (book == null) {
            return ResponseEntity.badRequest().build();
        }

        Review review = new Review();
        review.setContent(request.getContent());
        review.setBook(book);
        return ResponseEntity.ok(reviewRepository.save(review));
    }
}
