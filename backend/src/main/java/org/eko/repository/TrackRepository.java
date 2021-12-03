package org.eko.repository;

import org.eko.domain.model.Track;
import org.eko.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {
    List<Track> findTracksByUser(User user);
}
