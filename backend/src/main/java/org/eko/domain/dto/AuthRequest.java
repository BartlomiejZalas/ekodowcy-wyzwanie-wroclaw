package org.eko.domain.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class AuthRequest {

    @NotNull
    @NotEmpty
    private String login;
    @NotNull
    @NotEmpty
    private String password;

}
