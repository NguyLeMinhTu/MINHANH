package com.minhanh.backend.repository;

import com.minhanh.backend.entity.HinhAnhBaiViet;
import com.minhanh.backend.entity.BaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HinhAnhBaiVietRepository extends JpaRepository<HinhAnhBaiViet, String> {
    void deleteByBaiViet(BaiViet baiViet);
    List<HinhAnhBaiViet> findByBaiViet(BaiViet baiViet);
}
