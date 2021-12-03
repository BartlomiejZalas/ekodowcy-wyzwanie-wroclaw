package org.eko.domain.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eko.domain.dto.GeoCoordinate;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GeoCoordinatesConverter implements AttributeConverter<List<GeoCoordinate>, String> {
    private final ObjectMapper objectMapper;

    @Override
    public String convertToDatabaseColumn(List<GeoCoordinate> geoCoordinates) {

        String geoCoordinatesJson = null;
        try {
            geoCoordinatesJson = objectMapper.writeValueAsString(geoCoordinates);
        } catch (final JsonProcessingException e) {
            log.error("JSON writing error", e);
        }

        return geoCoordinatesJson;
    }

    @Override
    public List<GeoCoordinate> convertToEntityAttribute(String geoCoordinatesJson) {

        List<GeoCoordinate> geoCoordinates = null;
        try {
            geoCoordinates = Arrays.asList(objectMapper.readValue(geoCoordinatesJson, GeoCoordinate[].class));
        } catch (final IOException e) {
            log.error("JSON reading error", e);
        }

        return geoCoordinates;
    }

}
