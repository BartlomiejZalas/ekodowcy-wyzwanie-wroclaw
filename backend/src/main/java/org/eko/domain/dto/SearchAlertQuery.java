package org.eko.domain.dto;

import lombok.Value;

@Value
public class SearchAlertQuery {
    Long startTimestamp;
    Long endTimestamp;
    String category;

}
