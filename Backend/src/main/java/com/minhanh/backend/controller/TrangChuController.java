package com.minhanh.backend.controller;

import com.minhanh.backend.dto.HomePageResponse;
import com.minhanh.backend.service.TrangChuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trang-chu")
@RequiredArgsConstructor
public class TrangChuController {

    private final TrangChuService trangChuService;

    /**
     * API lấy toàn bộ dữ liệu cần thiết cho trang chủ.
     */
    @GetMapping
    public HomePageResponse getTrangChu() {
        return trangChuService.getTrangChuData();
    }
}