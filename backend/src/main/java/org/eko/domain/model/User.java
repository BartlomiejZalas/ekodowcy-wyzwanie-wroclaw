package org.eko.domain.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table(schema ="EKO", name = "USER")
@Data
@NoArgsConstructor
public class User implements UserDetails, Serializable {

    @Id
    @Column(name ="ID", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USER_ID")
    @SequenceGenerator(name = "SEQ_USER_ID", sequenceName = "SEQ_USER_ID", schema = "EKO", allocationSize = 1)
    private Long id;

    @Column(name ="ENABLED",  nullable = false)
    private boolean enabled = true;

    @Column(name ="USERNAME",  nullable = false)
    private String username;

    @Column(name ="PASSWORD",  nullable = false)
    private String password;

    @Column(name ="EMAIL",  nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="SCHOOL_ID")
    private School school;

    @Column(name ="USER_ROLE",  nullable = false)
    @Getter(AccessLevel.NONE)
    private String authorities = "";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private Set<Track> tracks = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private Set<Alert> alerts = new HashSet<>();

    public User(String username, String password, String email, School school, String authorities) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.school = school;
        this.authorities = authorities;
    }


    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    public Set<Role> getAuthorities(){
        return Stream.of(authorities.split(",")).map(Role::new).collect(Collectors.toSet());
    }
}
