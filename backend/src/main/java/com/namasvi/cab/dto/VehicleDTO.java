package com.namasvi.cab.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDTO {
    private Long id;
    private String name;
    private String type;
    private int capacity;
    private double pricePerKm;
    private String imageUrl;
    private String status;
}
