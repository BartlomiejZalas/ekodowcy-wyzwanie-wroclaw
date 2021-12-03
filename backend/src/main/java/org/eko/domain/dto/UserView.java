package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserView {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("login")
    private String login;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("token")
    private String token;

    public UserView(Long id, String login) {
        this.id = id;
        this.login = login;
    }
}
