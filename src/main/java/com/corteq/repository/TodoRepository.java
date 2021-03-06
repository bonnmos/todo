package com.corteq.repository;

import com.corteq.domain.Todo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;


import java.util.List;

/**
 * Spring Data  repository for the Todo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("select todo from Todo todo where todo.user.login = ?#{principal.username}")
    List<Todo> findByUserIsCurrentUser();

    // @Query("select todo from Todo todo where todo.category = ?1")
    Page<Todo> findByCategory(String category, Pageable pageable);
}
