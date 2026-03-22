package com.minhanh.backend.repository;

import com.minhanh.backend.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, String> {
    // Tìm người dùng theo email
    Optional<NguoiDung> findByEmail(String email);

    boolean existsByEmail(String email);
}
