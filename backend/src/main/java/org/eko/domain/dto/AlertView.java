package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NonNull;
import lombok.Value;

import java.io.Serializable;

@Value
public class AlertView implements Serializable {
    private static final long serialVersionUID = 245978427104775436L;

    @JsonProperty("id")
    Long id;
    @JsonProperty("description")
    String description;
    @NonNull
    @JsonProperty("latitude")
    double latitude;
    @NonNull
    @JsonProperty("longitude")
    double longitude;
    @NonNull
    @JsonProperty("timestamp")
    Long timestamp;
    @JsonProperty("category")
    String category;

    @JsonCreator
    public AlertView(@JsonProperty("id") Long id,
                     @JsonProperty("description") String description,
                     @JsonProperty(value = "latitude", required = true) @NonNull double latitude,
                     @JsonProperty(value = "longitude", required = true) @NonNull double longitude,
                     @JsonProperty(value = "timestamp", required = true) @NonNull Long timestamp,
                     @JsonProperty("category") String category) {
        this.id = id;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
        this.category = category;
    }
}
