package com.namasvi.cab.service;

import com.namasvi.cab.dto.DashboardStats;
import com.namasvi.cab.entity.BookingStatus;
import com.namasvi.cab.entity.DriverStatus;
import com.namasvi.cab.entity.VehicleStatus;
import com.namasvi.cab.repository.BookingRepository;
import com.namasvi.cab.repository.DriverRepository;
import com.namasvi.cab.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    public DashboardStats getStats() {
        long totalBookings = bookingRepository.count();
        long activeVehicles = vehicleRepository.findAll().stream()
                .filter(v -> v.getStatus() == VehicleStatus.AVAILABLE)
                .count();
        double revenue = bookingRepository.findByStatus(BookingStatus.COMPLETED).stream()
                .mapToDouble(b -> b.getTotalPrice())
                .sum();
        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long availableDrivers = driverRepository.findByStatus(DriverStatus.AVAILABLE).size();
        long totalDrivers = driverRepository.count();
        long totalVehicles = vehicleRepository.count();

        return DashboardStats.builder()
                .totalBookings(totalBookings)
                .activeVehicles(activeVehicles)
                .revenue(revenue)
                .pendingBookings(pendingBookings)
                .availableDrivers(availableDrivers)
                .totalDrivers(totalDrivers)
                .totalVehicles(totalVehicles)
                .build();
    }
}
