package com.namasvi.cab.service;

import com.namasvi.cab.entity.CompanySettings;
import com.namasvi.cab.repository.CompanySettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanySettingsService {

    private final CompanySettingsRepository repository;

    public CompanySettings getSettings() {
        return repository.findById(1L).orElseGet(this::createDefault);
    }

    public CompanySettings updateSettings(CompanySettings updated) {
        CompanySettings existing = getSettings();
        existing.setCompanyName(updated.getCompanyName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setAddress(updated.getAddress());
        existing.setWhatsappNumber(updated.getWhatsappNumber());
        existing.setBasePricePerKm(updated.getBasePricePerKm());
        existing.setTaxPercent(updated.getTaxPercent());
        return repository.save(existing);
    }

    private CompanySettings createDefault() {
        CompanySettings defaults = CompanySettings.builder()
                .id(1L)
                .companyName("Namasvi Cab Services")
                .phone("+91 9876543210")
                .email("info@namasvicab.com")
                .address("Nashik, Maharashtra")
                .whatsappNumber("919876543210")
                .basePricePerKm("14")
                .taxPercent("5")
                .build();
        return repository.save(defaults);
    }
}
