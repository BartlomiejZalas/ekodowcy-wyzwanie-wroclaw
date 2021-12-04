package org.eko.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserScoreView implements Serializable {
    private static final long serialVersionUID = 5177656155749154026L;

    @JsonProperty("userId")
    Long userId;
    @JsonProperty("login")
    String login;
    @JsonProperty("schoolId")
    Long schoolId;
    @JsonProperty("schoolName")
    String schoolName;
    @JsonProperty("score")
    Long score;

    @JsonCreator
    public UserScoreView(@JsonProperty("userId") Long userId,
                         @JsonProperty("login") String login,
                         @JsonProperty("schoolId") Long schoolId,
                         @JsonProperty("schoolName") String schoolName,
                         @JsonProperty("score") Long score) {
        this.userId = userId;
        this.login = login;
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.score = score;
    }
}
