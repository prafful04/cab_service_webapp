package com.namasvi.cab.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:3000",

                        "https://cabserviceweba.vercel.app",
                        "cab-service-webapp-d0ymsuizh-prafful-s-projects.vercel.app",
                        "cab-service-webapp.vercel.app",
                         "https://cab-service-webapp.vercel.app",
                        "https://cab-service-webapp.vercel.app",

                       
                        "https://namasvicabservice.in",

                        
                        "https://www.namasvicabservice.in"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
