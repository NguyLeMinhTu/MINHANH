package com.minhanh.backend.controller;

import com.minhanh.backend.entity.ThongKe;
import com.minhanh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final SanPhamRepository sanPhamRepo;
    private final BaiVietRepository baiVietRepo;
    private final DanhMucSanPhamRepository dmSanPhamRepo;
    private final YeuCauTuVanRepository ycRepo;
    private final ThongKeRepository thongKeRepo;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalProducts", sanPhamRepo.count());
        stats.put("activeProducts", sanPhamRepo.countByTrangThai("cong_khai"));
        stats.put("totalPosts", baiVietRepo.count());
        stats.put("activePosts", baiVietRepo.countByTrangThai("PUBLISHED"));
        stats.put("productCategories", dmSanPhamRepo.count());
        stats.put("newConsultations", ycRepo.countByDaXuLy(false));
        stats.put("pageViews", thongKeRepo.findById("PAGE_VIEWS").map(ThongKe::getGiaTri).orElse(0L));
        stats.put("recentConsultations", ycRepo.findAllByOrderByNgayGuiDesc(PageRequest.of(0, 5)).getContent());
        
        return stats;
    }
}
