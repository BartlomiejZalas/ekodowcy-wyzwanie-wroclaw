package org.eko.domain.mapper;

import org.eko.domain.dto.TrackView;
import org.eko.domain.model.Track;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TrackViewMapper {

    public TrackView toTrackView(Track track) {
        return new TrackView(track.getId(), track.getDistance(), track.getPath(), track.getStartTime(), track.getEndTime(), track.getType());
    }

    public List<TrackView> toTrackView(List<Track> tracks) {
        return tracks.stream().map(this::toTrackView).collect(Collectors.toList());
    }
}
