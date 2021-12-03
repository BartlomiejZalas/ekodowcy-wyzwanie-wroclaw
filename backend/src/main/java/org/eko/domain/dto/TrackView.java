package org.eko.domain.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.eko.domain.model.TrackType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class TrackView {
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

    @JsonCreator
    public TrackView(@JsonProperty(value = "id") Long id,
                     @JsonProperty(value = "distance", required = true) @NotNull Long distance,
                     @JsonProperty(value = "path", required = true) @NotEmpty List<GeoCoordinate> path,
                     @JsonProperty(value = "startTimestamp") Long startTimestamp,
                     @JsonProperty(value = "stopTimestamp") Long stopTimestamp,
                     @JsonProperty(value = "type", required = true) TrackType type) {
        this.id = id;
        this.distance = distance;
        this.path = path;
        this.startTimestamp = startTimestamp;
        this.stopTimestamp = stopTimestamp;
        this.type = type;
    }
}
