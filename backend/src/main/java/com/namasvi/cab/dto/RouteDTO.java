package com.namasvi.cab.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteDTO {
    private Long id;
    private String sourceCity;
    private String destinationCity;
    private double distanceKm;
    private double startingPrice;
}
