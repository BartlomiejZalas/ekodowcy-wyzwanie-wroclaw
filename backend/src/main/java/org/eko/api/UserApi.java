package org.eko.api;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.SchoolScoreView;
import org.eko.domain.dto.UserScoreView;
import org.eko.repository.UserRepository;
import org.eko.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class UserApi {
    private final UserService userService;

    @GetMapping("/public/users/ranking")
    public List<UserScoreView> getUsersRanking(@RequestParam(value = "limit", required = false) Integer limit) {
        if (limit != null) {
            return userService.getUsersScores().stream().limit(limit).collect(Collectors.toList());
        } else {
            return userService.getUsersScores();
        }

    }
}
