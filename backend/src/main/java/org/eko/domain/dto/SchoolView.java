package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

import java.io.Serializable;

@Value
public class SchoolView implements Serializable {
    private static final long serialVersionUID = -3024692780838974749L;

    @JsonProperty("id")
    Long id;
    @JsonProperty("name")
    String name;

    @JsonCreator
    public SchoolView(@JsonProperty("id") Long id,
                      @JsonProperty("name") String name) {
        this.id = id;
        this.name = name;
    }
}
