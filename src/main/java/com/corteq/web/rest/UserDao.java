package com.corteq.web.rest;

import java.util.Optional;

import com.corteq.security.SecurityUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Custom DAO class to get the id of the currently logged in user id.
 */

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class UserDao {

    private final Logger log = LoggerFactory.getLogger(TodoResource.class);
    
    private final JdbcTemplate jdbcTemplate;
    long id = 1000;
    
    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public long getUserIdByCurrentLogin() {

        Optional<String> optional = SecurityUtils.getCurrentUserLogin();

        optional.ifPresent(login -> {
            String sql = "SELECT id FROM jhi_user WHERE login='" + login + "'";

            id = this.jdbcTemplate.queryForObject(sql, long.class);
        });
        log.debug("HERE is the id: {}", id);
        return id;
    }
}