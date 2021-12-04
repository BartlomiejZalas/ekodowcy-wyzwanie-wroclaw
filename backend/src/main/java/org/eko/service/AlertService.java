package org.eko.service;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.AlertView;
import org.eko.domain.dto.SearchAlertQuery;
import org.eko.domain.dto.UpdateAlertRequest;
import org.eko.domain.mapper.AlertViewMapper;
import org.eko.domain.model.Alert;
import org.eko.domain.model.AlertSpecification;
import org.eko.domain.model.User;
import org.eko.repository.AlertRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlertService {
    private final AlertRepository alertRepository;
    private final AlertViewMapper alertViewMapper;

    public List<AlertView> getAlerts(SearchAlertQuery searchAlertQuery) {
        final AlertSpecification alertSpecification = new AlertSpecification(searchAlertQuery);
        List<Alert> alerts = alertRepository.findAll(alertSpecification);

//        if (searchAlertQuery.getStartTimestamp() != null && searchAlertQuery.getEndTimestamp() != null){
//            alerts = alertRepository.findByTimeBetween(searchAlertQuery.getStartTimestamp(), searchAlertQuery.getEndTimestamp());
//        } else if (searchAlertQuery.getStartTimestamp() != null){
//            alerts = alertRepository.findByTimeGreaterThanEqual(searchAlertQuery.getStartTimestamp());
//        } else if (searchAlertQuery.getEndTimestamp() != null){
//            alerts = alertRepository.findByTimeLessThanEqual(searchAlertQuery.getEndTimestamp());
//        } else {
//            alerts = alertRepository.findAll();
//        }

        return alertViewMapper.toAlertView(alerts);
    }

    public List<AlertView> getAlerts(User user){
        List<Alert> alerts = alertRepository.findByUser(user);
        return alertViewMapper.toAlertView(alerts);
    }

    @Transactional
    public AlertView create(AlertView alertView, User user) {
        final Alert alert = new Alert(alertView.getDescription(), alertView.getLongitude(), alertView.getLatitude(), alertView.getTimestamp(), null, alertView.getCategory());
        user.getAlerts().add(alert);
        alert.setUser(user);

        final Alert savedAlert = alertRepository.save(alert);

        return alertViewMapper.toAlertView(savedAlert);
    }

    @Transactional
    public AlertView update(Long id, UpdateAlertRequest updateAlertRequest, User user) {
        Optional<Alert> alertOptional = alertRepository.findById(id);
        if (alertOptional.isEmpty()){
            throw new ValidationException(String.format("Alert with id %s not found.", id));
        }
        Alert alert = alertOptional.get();
        if (!alert.getUser().getId().equals(user.getId())){
            throw new ValidationException(String.format("Alert with id %s cannot be updated by user %s.", id, user.getUsername()));
        }

        alert.setDescription(updateAlertRequest.getDescription());

        final Alert savedAlert = alertRepository.save(alert);

        return alertViewMapper.toAlertView(savedAlert);
    }
}
