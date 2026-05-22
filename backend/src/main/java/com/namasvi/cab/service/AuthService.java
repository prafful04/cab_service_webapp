package com.namasvi.cab.service;

import com.namasvi.cab.dto.AuthResponse;
import com.namasvi.cab.dto.LoginRequest;
import com.namasvi.cab.dto.RegisterRequest;
import com.namasvi.cab.entity.Admin;
import com.namasvi.cab.exception.BadRequestException;
import com.namasvi.cab.repository.AdminRepository;
import com.namasvi.cab.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadRequestException("Admin not found"));

        String token = jwtTokenProvider.generateToken(admin.getUsername(), admin.getRole());

        return AuthResponse.builder()
                .token(token)
                .username(admin.getUsername())
                .role(admin.getRole())
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        if (adminRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new BadRequestException("Username already exists");
        }

        String role = request.getRole() != null ? request.getRole() : "ROLE_ADMIN";

        Admin admin = Admin.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        admin = adminRepository.save(admin);

        String token = jwtTokenProvider.generateToken(admin.getUsername(), admin.getRole());

        return AuthResponse.builder()
                .token(token)
                .username(admin.getUsername())
                .role(admin.getRole())
                .build();
    }
}
