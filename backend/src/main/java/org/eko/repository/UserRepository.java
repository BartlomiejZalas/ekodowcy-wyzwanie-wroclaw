package org.eko.repository;

import org.eko.domain.exception.NotFoundException;
import org.eko.domain.model.User;
import org.eko.domain.model.UserScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);


    default User getById(Long id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isEmpty()) {
            throw new NotFoundException(User.class, id);
        }
        if (!optionalUser.get().isEnabled()) {
            throw new NotFoundException(User.class, id);
        }
        return optionalUser.get();
    }

    @Query("SELECT u.id AS userId, u.username AS login, s.id AS schoolId, s.name AS schoolName, COALESCE(SUM(t.score), 0) as score " +
            "FROM User AS u LEFT JOIN u.school AS s LEFT JOIN u.tracks AS t GROUP BY u.id ORDER BY COALESCE(SUM(t.score), 0) DESC")
    List<UserScore> getUsersScore();
}
