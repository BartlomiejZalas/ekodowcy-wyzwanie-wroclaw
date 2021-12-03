package org.eko.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

@Data
@AllArgsConstructor
public class Role implements GrantedAuthority {

    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";

    private String authority;

}
