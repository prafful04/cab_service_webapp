package com.namasvi.cab.controller;

import com.namasvi.cab.dto.ApiResponse;
import com.namasvi.cab.dto.RouteDTO;
import com.namasvi.cab.service.RouteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {

    private final RouteService routeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RouteDTO>>> getAllRoutes() {
        return ResponseEntity.ok(ApiResponse.success(routeService.getAllRoutes()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RouteDTO>> getRouteById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(routeService.getRouteById(id)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RouteDTO>>> searchRoutes(
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String destination) {
        return ResponseEntity.ok(ApiResponse.success(routeService.searchRoutes(source, destination)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RouteDTO>> createRoute(@Valid @RequestBody RouteDTO routeDTO) {
        RouteDTO created = routeService.createRoute(routeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Route created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RouteDTO>> updateRoute(@PathVariable Long id, @Valid @RequestBody RouteDTO routeDTO) {
        return ResponseEntity.ok(ApiResponse.success("Route updated successfully", routeService.updateRoute(id, routeDTO)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
        return ResponseEntity.ok(ApiResponse.success("Route deleted successfully", null));
    }
}
