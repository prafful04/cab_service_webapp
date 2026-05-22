package com.namasvi.cab.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryDTO {
    private Long id;
    private String name;
    private String phone;
    private String pickupLocation;
    private String dropLocation;
    private String message;
    private LocalDateTime createdAt;
}
