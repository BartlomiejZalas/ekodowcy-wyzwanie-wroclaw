package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class SchoolData implements Serializable {
    private static final long serialVersionUID = -6183236737257771888L;

    @JsonProperty("poisId")
    int poisId;
    @JsonProperty("group")
    String group;
    @JsonProperty("subgroup")
    String subgroup;
    @JsonProperty("name")
    String name;
    @JsonProperty("address")
    String address;
    @JsonProperty("postCode")
    String postCode;
    @JsonProperty("status")
    String status;
    @JsonProperty("children")
    int children;
    @JsonProperty("units")
    int units;
    @JsonProperty("type")
    String type;
    @JsonProperty("x")
    double x;
    @JsonProperty("y")
    double y;
}
