package com.minhanh.backend.repository;

import com.minhanh.backend.entity.BoSuuTap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepository extends JpaRepository<BoSuuTap, String> {
    List<BoSuuTap> findByTrangThaiOrderByThuTuAsc(String trangThai);
    List<BoSuuTap> findAllByOrderByThuTuAsc();
}
