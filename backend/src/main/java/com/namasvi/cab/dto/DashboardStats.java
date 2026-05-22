package com.namasvi.cab.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStats {
    private long totalBookings;
    private long activeVehicles;
    private double revenue;
    private long pendingBookings;
    private long availableDrivers;
    private long totalDrivers;
    private long totalVehicles;
}
