package com.example.haibazoround2.controller;

import com.example.haibazoround2.dto.BookCreateRequest;
import com.example.haibazoround2.dto.BookDTO;
import com.example.haibazoround2.model.Author;
import com.example.haibazoround2.model.Book;
import com.example.haibazoround2.repository.AuthorRepository;
import com.example.haibazoround2.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public Page<BookDTO> getBooks(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "5") int size) {
        return bookRepository.findAll(PageRequest.of(page, size))
                .map(book -> {
                    BookDTO dto = new BookDTO();
                    dto.setId(book.getId());
                    dto.setTitle(book.getTitle());
                    dto.setAuthorName(book.getAuthor() != null ? book.getAuthor().getName() : "");
                    return dto;
                });
    }

    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody BookCreateRequest request) {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty() || request.getAuthorId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Author author = authorRepository.findById(request.getAuthorId()).orElse(null);
        if (author == null) {
            return ResponseEntity.badRequest().build();
        }

        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(author);
        return ResponseEntity.ok(bookRepository.save(book));
    }
}
