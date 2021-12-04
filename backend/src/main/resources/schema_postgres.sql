
CREATE SEQUENCE EKO.SEQ_SCHOOL_ID
     START WITH 1
     INCREMENT BY 1;

CREATE TABLE EKO.SCHOOL (
    ID BIGINT DEFAULT nextval('EKO.SEQ_SCHOOL_ID') PRIMARY KEY NOT NULL,
    NAME VARCHAR(500),
    POIS_ID BIGINT NOT NULL
    );

CREATE SEQUENCE EKO.SEQ_USER_ID
     START WITH 1
     INCREMENT BY 1;

CREATE TABLE EKO.USER (
    ID BIGINT DEFAULT nextval('EKO.SEQ_USER_ID') PRIMARY KEY NOT NULL,
    USERNAME VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    USER_ROLE VARCHAR(255) NOT NULL,
    ENABLED BIT NOT NULL,
    SCHOOL_ID BIGINT CONSTRAINT FK_USER_SCHOOL REFERENCES EKO.SCHOOL(ID)
    );

CREATE SEQUENCE EKO.SEQ_TRACK_ID
     START WITH 1
     INCREMENT BY 1;

CREATE TABLE EKO.TRACK (
    ID BIGINT DEFAULT nextval('EKO.SEQ_TRACK_ID') PRIMARY KEY NOT NULL,
    DISTANCE BIGINT NOT NULL,
    PATH JSON NOT NULL,
    USER_ID BIGINT NOT NULL CONSTRAINT FK_TRACK_USER REFERENCES EKO.USER(ID),
    START_TIME BIGINT,
    END_TIME BIGINT,
    TRACK_TYPE VARCHAR(255) NOT NULL,
    SCORE BiGINT NOT NULL
    );

CREATE SEQUENCE EKO.SEQ_ALERT_ID
     START WITH 1
     INCREMENT BY 1;

CREATE TABLE EKO.ALERT (
    ID BIGINT DEFAULT nextval('EKO.SEQ_ALERT_ID') PRIMARY KEY NOT NULL,
    DESCRIPTION VARCHAR(1000),
    USER_ID BIGINT NOT NULL CONSTRAINT FK_ALERT_USER REFERENCES EKO.USER(ID),
    LAT DECIMAL(11, 8),
    LONG DECIMAL(11, 8),
    TIME BIGINT
    );