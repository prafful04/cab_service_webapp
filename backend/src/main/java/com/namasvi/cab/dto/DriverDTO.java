package com.namasvi.cab.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private Long id;
    private String name;
    private String phone;
    private String licenseNumber;
    private int experienceYears;
    private String status;
    private Long vehicleId;
    private String vehicleName;
}
