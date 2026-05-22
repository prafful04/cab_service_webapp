package com.namasvi.cab.service;

import com.namasvi.cab.dto.InquiryDTO;
import com.namasvi.cab.entity.Inquiry;
import com.namasvi.cab.exception.ResourceNotFoundException;
import com.namasvi.cab.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public List<InquiryDTO> getAllInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public InquiryDTO getInquiryById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry", id));
        return mapToDTO(inquiry);
    }

    public InquiryDTO createInquiry(InquiryDTO inquiryDTO) {
        Inquiry inquiry = mapToEntity(inquiryDTO);
        inquiry = inquiryRepository.save(inquiry);
        return mapToDTO(inquiry);
    }

    public void deleteInquiry(Long id) {
        if (!inquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inquiry", id);
        }
        inquiryRepository.deleteById(id);
    }

    private InquiryDTO mapToDTO(Inquiry inquiry) {
        return InquiryDTO.builder()
                .id(inquiry.getId())
                .name(inquiry.getName())
                .phone(inquiry.getPhone())
                .pickupLocation(inquiry.getPickupLocation())
                .dropLocation(inquiry.getDropLocation())
                .message(inquiry.getMessage())
                .createdAt(inquiry.getCreatedAt())
                .build();
    }

    private Inquiry mapToEntity(InquiryDTO dto) {
        return Inquiry.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .pickupLocation(dto.getPickupLocation())
                .dropLocation(dto.getDropLocation())
                .message(dto.getMessage())
                .build();
    }
}
