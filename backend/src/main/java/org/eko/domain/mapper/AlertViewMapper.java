package org.eko.domain.mapper;

import org.eko.domain.dto.AlertView;
import org.eko.domain.model.Alert;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlertViewMapper {
    public AlertView toAlertView(Alert a){
        return new AlertView(a.getId(), a.getDescription(), a.getLatitude(), a.getLongitude(), a.getTime(), a.getCategory());
    }

    public List<AlertView> toAlertView(List<Alert> alerts){
        return alerts.stream().map(this::toAlertView).collect(Collectors.toList());
    }
}
