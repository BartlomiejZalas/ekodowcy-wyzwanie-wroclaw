package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

@Value
public class UpdateAlertRequest {
    @JsonProperty("description")
    String description;

    @JsonCreator
    public UpdateAlertRequest(@JsonProperty("description") String description) {
        this.description = description;
    }
}
