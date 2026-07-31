package com.namasvi.cab.service;
import com.namasvi.cab.service.CloudinaryService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import com.namasvi.cab.dto.VehicleDTO;
import com.namasvi.cab.entity.Vehicle;
import com.namasvi.cab.entity.VehicleType;
import com.namasvi.cab.entity.VehicleStatus;
import com.namasvi.cab.exception.ResourceNotFoundException;
import com.namasvi.cab.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class VehicleService {
    private final CloudinaryService cloudinaryService;
    private final VehicleRepository vehicleRepository;
   String imageUrl = cloudinaryService.upload(file);
     vehicle.setImageUrl(imageUrl);
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", id));
        return mapToDTO(vehicle);
    }

    public VehicleDTO createVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = mapToEntity(vehicleDTO);
        vehicle = vehicleRepository.save(vehicle);
        return mapToDTO(vehicle);
    }

    public VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", id));

        existing.setName(vehicleDTO.getName());
        existing.setType(VehicleType.valueOf(vehicleDTO.getType()));
        existing.setCapacity(vehicleDTO.getCapacity());
        existing.setPricePerKm(vehicleDTO.getPricePerKm());
        existing.setImageUrl(vehicleDTO.getImageUrl());
        if (vehicleDTO.getStatus() != null) {
            existing.setStatus(VehicleStatus.valueOf(vehicleDTO.getStatus()));
        }

        existing = vehicleRepository.save(existing);
        return mapToDTO(existing);
    }

    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle", id);
        }
        vehicleRepository.deleteById(id);
    }

    public List<VehicleDTO> getAvailableVehicles() {
        return vehicleRepository.findAll().stream()
                .filter(v -> v.getStatus() == VehicleStatus.AVAILABLE)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    @PostMapping("/upload")
public String upload(@RequestParam("file") MultipartFile file) throws IOException {

    return cloudinaryService.upload(file);
}
    private VehicleDTO mapToDTO(Vehicle vehicle) {
        return VehicleDTO.builder()
                .id(vehicle.getId())
                .name(vehicle.getName())
                .type(vehicle.getType().name())
                .capacity(vehicle.getCapacity())
                .pricePerKm(vehicle.getPricePerKm())
                .imageUrl(vehicle.getImageUrl())
                .status(vehicle.getStatus().name())
                .build();
    }

    

    private Vehicle mapToEntity(VehicleDTO dto) {
        return Vehicle.builder()
                .name(dto.getName())
                .type(VehicleType.valueOf(dto.getType()))
                .capacity(dto.getCapacity())
                .pricePerKm(dto.getPricePerKm())
                .imageUrl(dto.getImageUrl())
                .status(dto.getStatus() != null ? VehicleStatus.valueOf(dto.getStatus()) : VehicleStatus.AVAILABLE)
                .build();
    }
}
