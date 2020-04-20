package com.utsavberi.levelUpFitness.service.auth;

import com.utsavberi.levelUpFitness.model.User;

public interface UserService {
    void save(User user);
    User findByUsername(String username);
}
