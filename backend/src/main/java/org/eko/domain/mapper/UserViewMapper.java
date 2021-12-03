package org.eko.domain.mapper;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.UserView;
import org.eko.domain.model.User;
import org.eko.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserViewMapper {
    private UserRepository userRepository;

    public UserView toUserView(User user){
        return new UserView(user.getId(), user.getUsername());
    }

    public List<UserView> toUserView(List<User> users){
        return users.stream().map(this::toUserView).collect(Collectors.toList());
    }

    public UserView toUserViewById(Long id) {
        if (id == null) {
            return null;
        }
        return toUserView(userRepository.getById(id));
    }
}
