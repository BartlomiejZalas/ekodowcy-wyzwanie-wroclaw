//package org.eko.domain.model;
//
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@Entity
//@Table(schema = "EKO", name = "ALERT")
//@Data
//@NoArgsConstructor
//public class Alert {
//    @Id
//    @Column(name = "ID", updatable = false, nullable = false)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ALERT_ID")
//    @SequenceGenerator(name = "SEQ_ALERT_ID", sequenceName = "SEQ_ALERT_ID", schema = "EKO", allocationSize = 1)
//    private Long id;
//
//    @Column(name = "DESCRIPTION")
//    private String description;
//
//    @Column(name = "LAT", nullable = false)
//    private Long latitude;
//
//    @Column(name = "LNG", nullable = false)
//    private Long longitude;
//
//    @Column(name = "TIME", nullable = false)
//    private Long time;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_ID", nullable = false)
//    private User user;
//
//    public Alert(String description, Long longitude, Long latitude, Long time, User user) {
//        this.description = description;
//        this.longitude = longitude;
//        this.latitude = latitude;
//        this.time = time;
//        this.user = user;
//    }
//}
