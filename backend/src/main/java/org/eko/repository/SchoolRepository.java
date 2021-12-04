package org.eko.repository;

import org.eko.domain.model.School;
import org.eko.domain.model.SchoolScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {

    @Query("SELECT s.id AS schoolId, s.name AS schoolName, COALESCE(SUM(t.score), 0) as score " +
            "FROM School AS s LEFT JOIN s.users AS u LEFT JOIN u.tracks AS t GROUP BY s.id ORDER BY COALESCE(SUM(t.score), 0) DESC")
    List<SchoolScore> getSchoolsScore();
}
