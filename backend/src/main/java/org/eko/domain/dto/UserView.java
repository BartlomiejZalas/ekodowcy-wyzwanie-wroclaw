package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserView implements Serializable {
    private static final long serialVersionUID = -7988343716672170534L;

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
