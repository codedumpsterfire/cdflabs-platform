package com.cdfxlabs.backend.controllers;

import com.cdfxlabs.backend.models.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cdfxlabs.backend.services.UserService;

import java.util.List;

@Controller
@RequestMapping(path = "/api/users/")
@Slf4j
@Tag(name = "Users", description = "Get all users")
public class UsersController {
    private final UserService userService;

    public UsersController(UserService userService){
        this.userService = userService;
    }

    @Operation(summary = "Get all users", description = "Returns all users")
    @GetMapping
    public List<User> getUsers(){
        return userService.getAllUsers();
    }
}