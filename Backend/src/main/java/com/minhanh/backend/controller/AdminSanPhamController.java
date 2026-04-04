package com.minhanh.backend.controller;

import com.minhanh.backend.dto.SanPhamRequestDto;
import com.minhanh.backend.entity.SanPham;
import com.minhanh.backend.service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/admin/san-pham")
@RequiredArgsConstructor
public class AdminSanPhamController {

    private final SanPhamService sanPhamService;

    @GetMapping
    public ResponseEntity<Page<SanPham>> getSanPhams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String danhMucId,
            @RequestParam(required = false) String thuongHieu) {
        
        Page<SanPham> result = sanPhamService.getAdminPageSanPhams(page, size, search, danhMucId, thuongHieu);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<SanPham> createSanPham(@RequestBody SanPhamRequestDto dto) {
        return ResponseEntity.ok(sanPhamService.createSanPham(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SanPham> updateSanPham(@PathVariable String id, @RequestBody SanPhamRequestDto dto) {
        return ResponseEntity.ok(sanPhamService.updateSanPham(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSanPham(@PathVariable String id) {
        sanPhamService.deleteSanPham(id);
        return ResponseEntity.ok("Xóa sản phẩm thành công");
    }
}
