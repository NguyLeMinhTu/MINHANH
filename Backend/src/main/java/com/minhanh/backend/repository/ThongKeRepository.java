package com.minhanh.backend.repository;

import com.minhanh.backend.entity.ThongKe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThongKeRepository extends JpaRepository<ThongKe, String> {
}
