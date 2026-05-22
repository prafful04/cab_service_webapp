package com.namasvi.cab.repository;

import com.namasvi.cab.entity.Booking;
import com.namasvi.cab.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);

    long countByStatus(BookingStatus status);

    List<Booking> findByBookingDateBetween(LocalDate startDate, LocalDate endDate);
}
