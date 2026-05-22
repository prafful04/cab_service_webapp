package com.namasvi.cab.controller;

import com.namasvi.cab.dto.ApiResponse;
import com.namasvi.cab.dto.InquiryDTO;
import com.namasvi.cab.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<InquiryDTO>>> getAllInquiries() {
        return ResponseEntity.ok(ApiResponse.success(inquiryService.getAllInquiries()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InquiryDTO>> createInquiry(@Valid @RequestBody InquiryDTO inquiryDTO) {
        InquiryDTO created = inquiryService.createInquiry(inquiryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Inquiry submitted successfully", created));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Inquiry deleted successfully", null));
    }
}
