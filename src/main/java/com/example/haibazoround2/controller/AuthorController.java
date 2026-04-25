package com.example.haibazoround2.controller;

import com.example.haibazoround2.dto.AuthorDTO;
import com.example.haibazoround2.model.Author;
import com.example.haibazoround2.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public Page<AuthorDTO> getAuthors(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "5") int size) {
        return authorRepository.findAll(PageRequest.of(page, size))
                .map(author -> {
                    AuthorDTO dto = new AuthorDTO();
                    dto.setId(author.getId());
                    dto.setName(author.getName());
                    dto.setBooksCount(author.getBooks() != null ? author.getBooks().size() : 0);
                    return dto;
                });
    }

    @GetMapping("/all")
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
        if (author.getName() == null || author.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(authorRepository.save(author));
    }
}
