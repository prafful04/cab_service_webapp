package com.namasvi.cab.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {
    private Long id;
    private String customerName;
    private String customerPhone;
    private String pickupLocation;
    private String dropLocation;
    private LocalDate bookingDate;
    private LocalDate travelDate;
    private String status;
    private Long vehicleId;
    private String vehicleName;
    private double totalPrice;
    private String specialRequests;
}
