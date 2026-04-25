package com.example.haibazoround2.repository;

import com.example.haibazoround2.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Page<Author> findAll(Pageable pageable);
}
