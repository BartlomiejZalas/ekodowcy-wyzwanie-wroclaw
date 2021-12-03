package org.eko.api;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.TrackView;
import org.eko.service.TrackService;
import org.eko.util.RequestUtil;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/tracks")
@RequiredArgsConstructor
public class TrackApi {

    private final TrackService trackService;

    @GetMapping
    public List<TrackView> getUserTracks() {
        return trackService.getUserTracks(RequestUtil.getUserForRequest());
    }

    @PostMapping
    public TrackView addUserTrack(@RequestBody @Valid TrackView createTrackRequest) {
        return trackService.create(createTrackRequest, RequestUtil.getUserForRequest());
    }

}
