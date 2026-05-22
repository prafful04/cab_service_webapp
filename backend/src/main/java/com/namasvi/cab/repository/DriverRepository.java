package com.namasvi.cab.repository;

import com.namasvi.cab.entity.Driver;
import com.namasvi.cab.entity.DriverStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    List<Driver> findByStatus(DriverStatus status);
}
