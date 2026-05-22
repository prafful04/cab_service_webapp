package com.namasvi.cab.controller;

import com.namasvi.cab.dto.ApiResponse;
import com.namasvi.cab.entity.CompanySettings;
import com.namasvi.cab.service.CompanySettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class CompanySettingsController {

    private final CompanySettingsService settingsService;

    @GetMapping
    public ResponseEntity<ApiResponse<CompanySettings>> getSettings() {
        return ResponseEntity.ok(ApiResponse.success(settingsService.getSettings()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<CompanySettings>> updateSettings(@RequestBody CompanySettings settings) {
        return ResponseEntity.ok(ApiResponse.success("Settings updated", settingsService.updateSettings(settings)));
    }
}
