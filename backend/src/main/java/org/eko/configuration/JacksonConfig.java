package org.eko.configuration;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.vavr.jackson.datatype.VavrModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper(){
        ObjectMapper instance = new ObjectMapper();

        instance.registerModule(new Jdk8Module());
        instance.registerModule(new JavaTimeModule());
        instance.registerModule(new VavrModule());

        instance.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        instance.configure(MapperFeature.AUTO_DETECT_GETTERS, false);
        instance.configure(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS, false);
        return instance;
    }
}
