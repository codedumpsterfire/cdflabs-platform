package com.cdfxlabs.backend.services;

import org.springframework.stereotype.Service;
import com.cdfxlabs.backend.models.entity.User;
import com.cdfxlabs.backend.repositories.UserRepository;;
import java.util.List;

@Service
public class UserService {

    private final UserRepository user;

    public UserService(UserRepository user){
        this.user = user;
    }

    public List<User> getAllUsers(){
        return user.findAll();
    }
}