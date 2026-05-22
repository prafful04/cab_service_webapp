package com.namasvi.cab.service;

import com.namasvi.cab.dto.BookingDTO;
import com.namasvi.cab.entity.Booking;
import com.namasvi.cab.entity.BookingStatus;
import com.namasvi.cab.entity.Vehicle;
import com.namasvi.cab.exception.BadRequestException;
import com.namasvi.cab.exception.ResourceNotFoundException;
import com.namasvi.cab.repository.BookingRepository;
import com.namasvi.cab.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", id));
        return mapToDTO(booking);
    }

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = mapToEntity(bookingDTO);
        booking.setBookingDate(LocalDate.now());
        booking.setStatus(BookingStatus.PENDING);

        if (booking.getVehicle() != null) {
            Vehicle vehicle = booking.getVehicle();
            double estimatedPrice = vehicle.getPricePerKm() * 100;
            booking.setTotalPrice(estimatedPrice);
        }

        booking = bookingRepository.save(booking);
        return mapToDTO(booking);
    }

    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", id));

        existing.setCustomerName(bookingDTO.getCustomerName());
        existing.setCustomerPhone(bookingDTO.getCustomerPhone());
        existing.setPickupLocation(bookingDTO.getPickupLocation());
        existing.setDropLocation(bookingDTO.getDropLocation());
        existing.setTravelDate(bookingDTO.getTravelDate());
        existing.setSpecialRequests(bookingDTO.getSpecialRequests());

        if (bookingDTO.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(bookingDTO.getVehicleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehicle", bookingDTO.getVehicleId()));
            existing.setVehicle(vehicle);
        }

        if (bookingDTO.getStatus() != null) {
            existing.setStatus(BookingStatus.valueOf(bookingDTO.getStatus()));
        }

        existing = bookingRepository.save(existing);
        return mapToDTO(existing);
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Booking", id);
        }
        bookingRepository.deleteById(id);
    }

    public BookingDTO updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", id));

        BookingStatus newStatus;
        try {
            newStatus = BookingStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid booking status: " + status);
        }

        booking.setStatus(newStatus);
        booking = bookingRepository.save(booking);
        return mapToDTO(booking);
    }

    public List<BookingDTO> getBookingsByDateRange(LocalDate startDate, LocalDate endDate) {
        return bookingRepository.findByBookingDateBetween(startDate, endDate).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private BookingDTO mapToDTO(Booking booking) {
        return BookingDTO.builder()
                .id(booking.getId())
                .customerName(booking.getCustomerName())
                .customerPhone(booking.getCustomerPhone())
                .pickupLocation(booking.getPickupLocation())
                .dropLocation(booking.getDropLocation())
                .bookingDate(booking.getBookingDate())
                .travelDate(booking.getTravelDate())
                .status(booking.getStatus().name())
                .vehicleId(booking.getVehicle() != null ? booking.getVehicle().getId() : null)
                .vehicleName(booking.getVehicle() != null ? booking.getVehicle().getName() : null)
                .totalPrice(booking.getTotalPrice())
                .specialRequests(booking.getSpecialRequests())
                .build();
    }

    private Booking mapToEntity(BookingDTO dto) {
        Booking.BookingBuilder builder = Booking.builder()
                .customerName(dto.getCustomerName())
                .customerPhone(dto.getCustomerPhone())
                .pickupLocation(dto.getPickupLocation())
                .dropLocation(dto.getDropLocation())
                .travelDate(dto.getTravelDate())
                .specialRequests(dto.getSpecialRequests());

        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehicle", dto.getVehicleId()));
            builder.vehicle(vehicle);
        }

        return builder.build();
    }
}
