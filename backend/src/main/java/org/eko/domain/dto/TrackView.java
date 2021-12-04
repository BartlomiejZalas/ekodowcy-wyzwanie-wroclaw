package org.eko.domain.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;
import org.eko.domain.model.TrackType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Value
public class TrackView implements Serializable {
    private static final long serialVersionUID = -5975096066504125450L;

    @JsonProperty("id")
    Long id;

    @NotNull
    @JsonProperty(value = "distance")
    Long distance;

    @JsonProperty(value = "path")
    @NotEmpty
    List<GeoCoordinate> path;

    @JsonProperty("startTimestamp")
    Long startTimestamp;

    @JsonProperty("stopTimestamp")
    Long stopTimestamp;

    @JsonProperty("type")
    TrackType type;

    @JsonProperty("score")
    Long score;

    @JsonCreator
    public TrackView(@JsonProperty(value = "id") Long id,
                     @JsonProperty(value = "distance", required = true) @NotNull Long distance,
                     @JsonProperty(value = "path", required = true) @NotEmpty List<GeoCoordinate> path,
                     @JsonProperty(value = "startTimestamp") Long startTimestamp,
                     @JsonProperty(value = "stopTimestamp") Long stopTimestamp,
                     @JsonProperty(value = "type", required = true) TrackType type,
                     @JsonProperty("score") Long score) {
        this.id = id;
        this.distance = distance;
        this.path = path;
        this.startTimestamp = startTimestamp;
        this.stopTimestamp = stopTimestamp;
        this.type = type;
        this.score = score == null ? 1L : score;
    }
}
