CREATE SEQUENCE EKO.SEQ_USER_ID
     START WITH 1
     INCREMENT BY 1
     NO CACHE;

CREATE TABLE EKO.USER (
    ID BIGINT DEFAULT (NEXT VALUE FOR EKO.SEQ_USER_ID) PRIMARY KEY NOT NULL,
    USERNAME NVARCHAR(255) NOT NULL,
    EMAIL NVARCHAR(255) NOT NULL,
    PASSWORD NVARCHAR(255) NOT NULL,
    USER_ROLE NVARCHAR(255) NOT NULL,
    ENABLED BIT NOT NULL,
    SCHOOL_ID BIGINT NOT NULL
    );

CREATE SEQUENCE EKO.SEQ_TRACK_ID
     START WITH 1
     INCREMENT BY 1
     NO CACHE;

CREATE TABLE EKO.TRACK (
    ID BIGINT DEFAULT (NEXT VALUE FOR EKO.SEQ_TRACK_ID) PRIMARY KEY NOT NULL,
    DISTANCE BIGINT NOT NULL,
    PATH NVARCHAR(MAX) NOT NULL,
    USER_ID BIGINT NOT NULL CONSTRAINT FK_TRACK_USER REFERENCES EKO.USER(ID),
    START_TIME BIGINT,
    END_TIME BIGINT,
    TRACK_TYPE NVARCHAR(255) NOT NULL
    );