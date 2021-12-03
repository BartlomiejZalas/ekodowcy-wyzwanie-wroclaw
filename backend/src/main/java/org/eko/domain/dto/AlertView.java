package org.eko.domain.dto;

import lombok.NonNull;
import lombok.Value;

@Value
public class AlertView {

    Long id;
    String description;
    @NonNull
    Long latitude;
    @NonNull
    Long longitude;
    @NonNull
    Long timestamp;


}
