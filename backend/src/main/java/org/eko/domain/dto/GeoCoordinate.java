package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

import java.io.Serializable;

@Value
public class GeoCoordinate implements Serializable {
    private static final long serialVersionUID = -6486588518186072942L;

    @JsonProperty("latitude")
    double latitude;

    @JsonProperty("longitude")
    double longitude;

    @JsonCreator
    public GeoCoordinate(@JsonProperty("latitude") double latitude,
                         @JsonProperty("longitude") double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
