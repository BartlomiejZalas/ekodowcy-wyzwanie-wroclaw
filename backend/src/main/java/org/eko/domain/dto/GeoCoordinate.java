package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

@Value
public class GeoCoordinate {
    @JsonProperty("latitude")
    Long latitude;

    @JsonProperty("longitude")
    Long longitude;

    @JsonCreator
    public GeoCoordinate(@JsonProperty("latitude") Long latitude,
                         @JsonProperty("longitude") Long longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
