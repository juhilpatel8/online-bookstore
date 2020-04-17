package com.rishimax.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishimax.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
