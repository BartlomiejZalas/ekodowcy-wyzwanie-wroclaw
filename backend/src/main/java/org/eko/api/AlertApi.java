package org.eko.api;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.AlertView;
import org.eko.domain.dto.SearchAlertQuery;
import org.eko.domain.dto.UpdateAlertRequest;
import org.eko.domain.model.User;
import org.eko.service.AlertService;
import org.eko.util.RequestUtil;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AlertApi {
    private final AlertService alertService;

    @GetMapping("/public/alerts")
    public List<AlertView> getAlerts(@RequestParam(name = "startTimestamp", required = false) Long startTimestamp,
                                     @RequestParam(name = "endTimestamp", required = false) Long endTimestamp) {
        return alertService.getAlerts(new SearchAlertQuery(startTimestamp, endTimestamp));
    }

    @GetMapping("/alerts")
    public List<AlertView> getAlerts() {
        User user = RequestUtil.getUserForRequest();
        return alertService.getAlerts(user);
    }

    @PostMapping("/alert")
    public AlertView createAlert(@RequestBody @Valid AlertView createAlertRequest){
        User user = RequestUtil.getUserForRequest();
        return alertService.create(createAlertRequest, user);
    }

    @PatchMapping("/alert/{id}")
    public AlertView updateAlert(@PathVariable Long id, @RequestBody @Valid UpdateAlertRequest updateAlertRequest){
        User user = RequestUtil.getUserForRequest();

        return alertService.update(id, updateAlertRequest, user);
    }
}
