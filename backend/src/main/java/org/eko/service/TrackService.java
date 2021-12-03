package org.eko.service;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.TrackView;
import org.eko.domain.mapper.TrackViewMapper;
import org.eko.domain.model.Track;
import org.eko.domain.model.User;
import org.eko.repository.TrackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrackService {
    private final TrackRepository trackRepository;
    private final TrackViewMapper trackViewMapper;

    @Transactional
    public TrackView create(TrackView trackView, User user) {

        final Track track = new Track(trackView.getDistance(), trackView.getPath(), trackView.getStartTimestamp(), trackView.getStopTimestamp(), user);

        final Track savedTrack = trackRepository.save(track);

        return trackViewMapper.toTrackView(savedTrack);
    }

    public List<TrackView> getUserTracks(User user) {
        List<Track> tracksByUser = trackRepository.findTracksByUser(user);

        return trackViewMapper.toTrackView(tracksByUser).stream()
                .sorted(Comparator.comparing(TrackView::getId))
                .collect(Collectors.toList());
    }
}
