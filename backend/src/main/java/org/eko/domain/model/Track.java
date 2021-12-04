package org.eko.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.eko.domain.dto.GeoCoordinate;
import org.eko.domain.mapper.GeoCoordinatesConverter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(schema = "EKO", name = "TRACK")
@Data
@NoArgsConstructor
public class Track {
    @Id
    @Column(name = "ID", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TRACK_ID")
    @SequenceGenerator(name = "SEQ_TRACK_ID", sequenceName = "SEQ_TRACK_ID", schema = "EKO", allocationSize = 1)
    private Long id;

    @Column(name = "DISTANCE", nullable = false)
    private Long distance;

    @Column(name = "PATH", nullable = false)
    @Convert(converter = GeoCoordinatesConverter.class)
    private List<GeoCoordinate> path;

    @Column(name = "START_TIME")
    private Long startTime;

    @Column(name = "END_TIME")
    private Long endTime;

    @Column(name = "TRACK_TYPE")
    @Enumerated(EnumType.STRING)
    private TrackType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Column(name = "SCORE", nullable = false)
    private Long score;

    public Track(Long distance, List<GeoCoordinate> path, Long startTime, Long endTime, Long score, User user, TrackType type) {
        this.distance = distance;
        this.path = path;
        this.score = score;
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
    }
}
