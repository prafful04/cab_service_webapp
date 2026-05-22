package com.namasvi.cab.repository;

import com.namasvi.cab.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {
    Optional<Route> findBySourceCityAndDestinationCity(String sourceCity, String destinationCity);
}
