package org.eko.service;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.CreateUserRequest;
import org.eko.domain.dto.UserView;
import org.eko.domain.mapper.UserViewMapper;
import org.eko.domain.model.User;
import org.eko.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserViewMapper userViewMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserView create(CreateUserRequest request) {
        if (userRepository.findByUsername(request.getLogin()).isPresent()) {
            throw new ValidationException("Username exists!");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ValidationException(String.format("There is already an account created for email %s!", request.getEmail()));
        }
        if (!request.getPassword().equals(request.getRePassword())) {
            throw new ValidationException("Passwords don't match!");
        }
        if (request.getType() == null) {
            request.setType("");
        }

        String password = passwordEncoder.encode(request.getPassword());
        final User user = new User(request.getLogin(), password, request.getEmail(), request.getSchoolId(), request.getType());

        final User savedUser = userRepository.save(user);

        return userViewMapper.toUserView(savedUser);
    }


    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(
                        () -> new UsernameNotFoundException(format("User with username - %s, not found", username))
                );
    }

}
