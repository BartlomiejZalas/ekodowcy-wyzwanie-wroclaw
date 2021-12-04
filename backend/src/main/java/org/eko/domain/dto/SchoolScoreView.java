package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

import java.io.Serializable;

@Value
public class SchoolScoreView implements Serializable {
    private static final long serialVersionUID = 1770914197050656053L;

    @JsonProperty("schoolId")
    Long schoolId;
    @JsonProperty("schoolName")
    String schoolName;
    @JsonProperty("score")
    Long score;

    @JsonCreator
    public SchoolScoreView(@JsonProperty("schoolId") Long schoolId,
                           @JsonProperty("schoolName") String schoolName,
                           @JsonProperty("score") Long score) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.score = score;
    }
}
