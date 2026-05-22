package com.namasvi.cab.service;

import com.namasvi.cab.dto.DriverDTO;
import com.namasvi.cab.entity.Driver;
import com.namasvi.cab.entity.DriverStatus;
import com.namasvi.cab.entity.Vehicle;
import com.namasvi.cab.exception.ResourceNotFoundException;
import com.namasvi.cab.repository.DriverRepository;
import com.namasvi.cab.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DriverService {

    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;

    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public DriverDTO getDriverById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", id));
        return mapToDTO(driver);
    }

    public DriverDTO createDriver(DriverDTO driverDTO) {
        Driver driver = mapToEntity(driverDTO);
        driver = driverRepository.save(driver);
        return mapToDTO(driver);
    }

    public DriverDTO updateDriver(Long id, DriverDTO driverDTO) {
        Driver existing = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", id));

        existing.setName(driverDTO.getName());
        existing.setPhone(driverDTO.getPhone());
        existing.setLicenseNumber(driverDTO.getLicenseNumber());
        existing.setExperienceYears(driverDTO.getExperienceYears());
        if (driverDTO.getStatus() != null) {
            existing.setStatus(DriverStatus.valueOf(driverDTO.getStatus()));
        }
        if (driverDTO.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(driverDTO.getVehicleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehicle", driverDTO.getVehicleId()));
            existing.setVehicle(vehicle);
        } else {
            existing.setVehicle(null);
        }

        existing = driverRepository.save(existing);
        return mapToDTO(existing);
    }

    public void deleteDriver(Long id) {
        if (!driverRepository.existsById(id)) {
            throw new ResourceNotFoundException("Driver", id);
        }
        driverRepository.deleteById(id);
    }

    public List<DriverDTO> getAvailableDrivers() {
        return driverRepository.findByStatus(DriverStatus.AVAILABLE).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public DriverDTO assignVehicle(Long driverId, Long vehicleId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", driverId));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", vehicleId));

        driver.setVehicle(vehicle);
        driver = driverRepository.save(driver);
        return mapToDTO(driver);
    }

    private DriverDTO mapToDTO(Driver driver) {
        return DriverDTO.builder()
                .id(driver.getId())
                .name(driver.getName())
                .phone(driver.getPhone())
                .licenseNumber(driver.getLicenseNumber())
                .experienceYears(driver.getExperienceYears())
                .status(driver.getStatus().name())
                .vehicleId(driver.getVehicle() != null ? driver.getVehicle().getId() : null)
                .vehicleName(driver.getVehicle() != null ? driver.getVehicle().getName() : null)
                .build();
    }

    private Driver mapToEntity(DriverDTO dto) {
        Driver.DriverBuilder builder = Driver.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .licenseNumber(dto.getLicenseNumber())
                .experienceYears(dto.getExperienceYears())
                .status(dto.getStatus() != null ? DriverStatus.valueOf(dto.getStatus()) : DriverStatus.AVAILABLE);

        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehicle", dto.getVehicleId()));
            builder.vehicle(vehicle);
        }

        return builder.build();
    }
}
