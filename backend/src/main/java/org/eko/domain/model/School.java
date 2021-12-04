package org.eko.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(schema = "EKO", name = "SCHOOL")
@Data
@NoArgsConstructor
public class School {
    @Id
    @Column(name = "ID", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_SCHOOL_ID")
    @SequenceGenerator(name = "SEQ_SCHOOL_ID", sequenceName = "SEQ_SCHOOL_ID", schema = "EKO", allocationSize = 1)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "POIS_ID", nullable = false)
    private Long poisId;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private Set<User> users = new HashSet<>();

    public School(String name, Long poisId) {
        this.name = name;
        this.poisId = poisId;
    }
}
