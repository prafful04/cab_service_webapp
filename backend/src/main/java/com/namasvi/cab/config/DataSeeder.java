package com.namasvi.cab.config;

import com.namasvi.cab.entity.Admin;
import com.namasvi.cab.entity.CompanySettings;
import com.namasvi.cab.entity.Route;
import com.namasvi.cab.entity.Vehicle;
import com.namasvi.cab.entity.VehicleStatus;
import com.namasvi.cab.entity.VehicleType;
import com.namasvi.cab.repository.AdminRepository;
import com.namasvi.cab.repository.CompanySettingsRepository;
import com.namasvi.cab.repository.RouteRepository;
import com.namasvi.cab.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final CompanySettingsRepository companySettingsRepository;
    private final RouteRepository routeRepository;
    private final VehicleRepository vehicleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedSettings();
        seedRoutes();
        seedVehicles();
    }

    private void seedSettings() {
        if (companySettingsRepository.count() > 0) return;
        companySettingsRepository.save(CompanySettings.builder()
                .id(1L)
                .companyName("Namasvi Cab Services")
                .phone("+91 9067856440")
                .email("info@namasvicab.com")
                .address("Nashik, Maharashtra")
                .whatsappNumber("919067856440")
                .basePricePerKm("14")
                .taxPercent("5")
                .build());
    }

    private void seedAdmin() {
        if (adminRepository.findByUsername("admin").isEmpty()) {
            adminRepository.save(Admin.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("Appa123"))
                    .role("ROLE_ADMIN")
                    .build());
        }
    }

    private void seedRoutes() {
        if (routeRepository.count() > 0) return;

        routeRepository.saveAll(Arrays.asList(
                Route.builder().sourceCity("Nashik").destinationCity("Mumbai").distanceKm(165).startingPrice(3500).build(),
                Route.builder().sourceCity("Nashik").destinationCity("Pune").distanceKm(210).startingPrice(4500).build(),
                Route.builder().sourceCity("Mumbai").destinationCity("Pune").distanceKm(150).startingPrice(3000).build(),
                Route.builder().sourceCity("Nashik").destinationCity("Shirdi").distanceKm(90).startingPrice(2000).build(),
                Route.builder().sourceCity("Mumbai").destinationCity("Nashik").distanceKm(165).startingPrice(3500).build(),
                Route.builder().sourceCity("Pune").destinationCity("Nashik").distanceKm(210).startingPrice(4500).build(),
                Route.builder().sourceCity("Mumbai").destinationCity("Airport").distanceKm(25).startingPrice(500).build(),
                Route.builder().sourceCity("Pune").destinationCity("Shirdi").distanceKm(180).startingPrice(3800).build(),
                Route.builder().sourceCity("Nashik").destinationCity("Airport").distanceKm(180).startingPrice(3500).build()
        ));
    }

    private void seedVehicles() {
        if (vehicleRepository.count() > 0) return;

        vehicleRepository.saveAll(Arrays.asList(
                Vehicle.builder().name("Maruti Swift Dzire").type(VehicleType.SEDAN).capacity(4).pricePerKm(12).imageUrl("https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Toyota Etios").type(VehicleType.SEDAN).capacity(4).pricePerKm(13).imageUrl("https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Honda Amaze").type(VehicleType.SEDAN).capacity(4).pricePerKm(12).imageUrl("https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Toyota Innova Crysta").type(VehicleType.SUV).capacity(7).pricePerKm(18).imageUrl("https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Mahindra XUV700").type(VehicleType.SUV).capacity(7).pricePerKm(20).imageUrl("https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Toyota Fortuner").type(VehicleType.SUV).capacity(7).pricePerKm(25).imageUrl("https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Honda City").type(VehicleType.SEDAN).capacity(4).pricePerKm(14).imageUrl("https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Mercedes-Benz E-Class").type(VehicleType.LUXURY).capacity(4).pricePerKm(35).imageUrl("https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("BMW 5 Series").type(VehicleType.LUXURY).capacity(4).pricePerKm(38).imageUrl("https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Force Traveller").type(VehicleType.TEMPO_TRAVELLER).capacity(12).pricePerKm(28).imageUrl("https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400").status(VehicleStatus.AVAILABLE).build(),
                Vehicle.builder().name("Ashok Leyland Mini Bus").type(VehicleType.TEMPO_TRAVELLER).capacity(18).pricePerKm(32).imageUrl("https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400").status(VehicleStatus.AVAILABLE).build()
        ));
    }
}
