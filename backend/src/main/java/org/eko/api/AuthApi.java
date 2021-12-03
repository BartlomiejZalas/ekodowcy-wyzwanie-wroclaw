package org.eko.api;

import lombok.RequiredArgsConstructor;
import org.eko.configuration.security.JwtTokenUtil;
import org.eko.domain.dto.AuthRequest;
import org.eko.domain.dto.CreateUserRequest;
import org.eko.domain.dto.UserView;
import org.eko.domain.mapper.UserViewMapper;
import org.eko.domain.model.User;
import org.eko.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserViewMapper userViewMapper;
    private final UserService userService;

    @GetMapping("/helloUser")
    public String helloUser() {
        return "Hello user";
    }

    @GetMapping("/helloAdmin")
    public String helloAdmin() {
        return "Hello admin";
    }

    @PostMapping("/login")
    public ResponseEntity<UserView> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));

            User user = (User) authenticate.getPrincipal();

            UserView userView = userViewMapper.toUserView(user);

            String accessToken = jwtTokenUtil.generateAccessToken(user);

            userView.setToken(accessToken);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, accessToken)
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserView> register(@RequestBody @Valid CreateUserRequest request) {
        UserView userView = userService.create(request);

        User user = userService.loadUserByUsername(userView.getLogin());

        String accessToken = jwtTokenUtil.generateAccessToken(user);

        userView.setToken(accessToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(userView);

    }

}
