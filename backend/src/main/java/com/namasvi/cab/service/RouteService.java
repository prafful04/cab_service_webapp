package com.namasvi.cab.service;

import com.namasvi.cab.dto.RouteDTO;
import com.namasvi.cab.entity.Route;
import com.namasvi.cab.exception.ResourceNotFoundException;
import com.namasvi.cab.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RouteService {

    private final RouteRepository routeRepository;

    public List<RouteDTO> getAllRoutes() {
        return routeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public RouteDTO getRouteById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route", id));
        return mapToDTO(route);
    }

    public RouteDTO createRoute(RouteDTO routeDTO) {
        Route route = mapToEntity(routeDTO);
        route = routeRepository.save(route);
        return mapToDTO(route);
    }

    public RouteDTO updateRoute(Long id, RouteDTO routeDTO) {
        Route existing = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route", id));

        existing.setSourceCity(routeDTO.getSourceCity());
        existing.setDestinationCity(routeDTO.getDestinationCity());
        existing.setDistanceKm(routeDTO.getDistanceKm());
        existing.setStartingPrice(routeDTO.getStartingPrice());

        existing = routeRepository.save(existing);
        return mapToDTO(existing);
    }

    public void deleteRoute(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Route", id);
        }
        routeRepository.deleteById(id);
    }

    public List<RouteDTO> searchRoutes(String source, String destination) {
        if (source != null && destination != null) {
            return routeRepository.findBySourceCityAndDestinationCity(source, destination)
                    .map(route -> List.of(mapToDTO(route)))
                    .orElse(List.of());
        }
        return getAllRoutes();
    }

    private RouteDTO mapToDTO(Route route) {
        return RouteDTO.builder()
                .id(route.getId())
                .sourceCity(route.getSourceCity())
                .destinationCity(route.getDestinationCity())
                .distanceKm(route.getDistanceKm())
                .startingPrice(route.getStartingPrice())
                .build();
    }

    private Route mapToEntity(RouteDTO dto) {
        return Route.builder()
                .sourceCity(dto.getSourceCity())
                .destinationCity(dto.getDestinationCity())
                .distanceKm(dto.getDistanceKm())
                .startingPrice(dto.getStartingPrice())
                .build();
    }
}
