package com.namasvi.cab.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Table(name = "company_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanySettings {
    @Id
    private Long id;
    private String companyName;
    private String phone;
    private String email;
    private String address;
    private String whatsappNumber;
    private String basePricePerKm;
    private String taxPercent;
}
