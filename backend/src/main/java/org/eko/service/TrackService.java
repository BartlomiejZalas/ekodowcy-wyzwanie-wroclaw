package org.eko.service;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.TrackView;
import org.eko.domain.mapper.TrackViewMapper;
import org.eko.domain.model.Track;
import org.eko.domain.model.User;
import org.eko.repository.TrackRepository;
import org.eko.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrackService {
    private final TrackRepository trackRepository;
    private final TrackViewMapper trackViewMapper;
    private final UserRepository userRepository;

    @Transactional
    public TrackView create(TrackView trackView, User user) {

        final Track track = new Track(trackView.getDistance(), trackView.getPath(), trackView.getStartTimestamp(), trackView.getStopTimestamp(), trackView.getScore(), null, trackView.getType());
        user.getTracks().add(track);
        track.setUser(user);
        final Track savedTrack = trackRepository.save(track);

        return trackViewMapper.toTrackView(savedTrack);
    }

    public List<TrackView> getUserTracks(User user) {
        List<Track> tracksByUser = trackRepository.findTracksByUser(user);

        return trackViewMapper.toTrackView(tracksByUser).stream()
                .sorted(Comparator.comparing(TrackView::getId))
                .collect(Collectors.toList());
    }


    public boolean isBonusFor(User user, LocalDate date) {
        long startOfCurrentDate = date.atStartOfDay(ZoneId.of("UTC+01:00")).toEpochSecond();
        long startOfPreviousDay = date.minusDays(1).atStartOfDay(ZoneId.of("UTC+01:00")).toEpochSecond();
        long startOfTheDayBeforePreviousDay = date.minusDays(2).atStartOfDay(ZoneId.of("UTC+01:00")).toEpochSecond();

        List<Track> tracks = trackRepository.findTracksByUserAndStartTimeGreaterThanEqualAndEndTimeLessThan(user, startOfTheDayBeforePreviousDay, startOfCurrentDate);

        boolean trackOnDayBeforePreviousDay = tracks.stream().anyMatch(t -> isTrackBetweenDateTime(t, startOfTheDayBeforePreviousDay, startOfPreviousDay));
        boolean trackOnPreviousDay = tracks.stream().anyMatch(t -> isTrackBetweenDateTime(t, startOfPreviousDay, startOfCurrentDate));

        return trackOnPreviousDay && trackOnDayBeforePreviousDay;
    }

    private boolean isTrackBetweenDateTime(Track t, long start, long end) {
        return t.getStartTime() >= start && t.getEndTime() < end;
    }
}
