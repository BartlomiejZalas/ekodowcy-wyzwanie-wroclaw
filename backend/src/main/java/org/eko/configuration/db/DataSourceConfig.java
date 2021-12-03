//package org.eko.configuration.db;
//
//import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
//
//import javax.sql.DataSource;
//import java.util.Properties;
//
//@Configuration
//public class DataSourceConfig {
//    @Bean
//    public DataSource dataSource(EkoDataSourceProperties ekoDataSourceProperties){
//        DataSourceProperties properties = new DataSourceProperties();
//        properties.setDataPassword(ekoDataSourceProperties.getPassword());
//        properties.setDataUsername(ekoDataSourceProperties.getUsername());
//        properties.setDriverClassName(ekoDataSourceProperties.getDriverClassName());
//        properties.setUrl(ekoDataSourceProperties.getUrl());
//
//        return properties.initializeDataSourceBuilder().build();
//    }
//
//    @Bean
//    public HibernateJpaVendorAdapter jpaVendorAdapter(){
//        return new HibernateJpaVendorAdapter();
//    }
//
//    @Bean("jpaProperties")
//    public Properties jpaProperties(){
//
//    }
//}
