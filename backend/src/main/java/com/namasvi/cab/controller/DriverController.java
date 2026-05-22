package com.namasvi.cab.controller;

import com.namasvi.cab.dto.ApiResponse;
import com.namasvi.cab.dto.DriverDTO;
import com.namasvi.cab.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DriverDTO>>> getAllDrivers() {
        List<DriverDTO> drivers = driverService.getAllDrivers();
        return ResponseEntity.ok(ApiResponse.success(drivers));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DriverDTO>> getDriverById(@PathVariable Long id) {
        DriverDTO driver = driverService.getDriverById(id);
        return ResponseEntity.ok(ApiResponse.success(driver));
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<DriverDTO>>> getAvailableDrivers() {
        List<DriverDTO> drivers = driverService.getAvailableDrivers();
        return ResponseEntity.ok(ApiResponse.success(drivers));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DriverDTO>> createDriver(@RequestBody DriverDTO driverDTO) {
        DriverDTO created = driverService.createDriver(driverDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Driver created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DriverDTO>> updateDriver(@PathVariable Long id,
                                                                @RequestBody DriverDTO driverDTO) {
        DriverDTO updated = driverService.updateDriver(id, driverDTO);
        return ResponseEntity.ok(ApiResponse.success("Driver updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return ResponseEntity.ok(ApiResponse.success("Driver deleted successfully", null));
    }

    @PutMapping("/{driverId}/assign/{vehicleId}")
    public ResponseEntity<ApiResponse<DriverDTO>> assignVehicle(@PathVariable Long driverId,
                                                                 @PathVariable Long vehicleId) {
        DriverDTO updated = driverService.assignVehicle(driverId, vehicleId);
        return ResponseEntity.ok(ApiResponse.success("Vehicle assigned successfully", updated));
    }
}
