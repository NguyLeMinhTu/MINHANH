package com.minhanh.backend.controller;

import com.minhanh.backend.entity.DanhMucSanPham;
import com.minhanh.backend.service.DanhMucSanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danh-muc-san-pham")
@RequiredArgsConstructor
public class DanhMucSanPhamController {

    private final DanhMucSanPhamService service;

    // GET /api/danh-muc-san-pham → lấy tất cả
    @GetMapping
    public List<DanhMucSanPham> getAll() {
        return service.getAll();
    }

    // GET /api/danh-muc-san-pham/cha → lấy danh mục cha
    @GetMapping("/cha")
    public List<DanhMucSanPham> getDanhMucCha() {
        return service.getDanhMucCha();
    }

    // GET /api/danh-muc-san-pham/{id}
    @GetMapping("/{id}")
    public DanhMucSanPham getById(@PathVariable String id) {
        return service.getById(id);
    }

    // POST /api/danh-muc-san-pham → tạo mới
    @PostMapping
    public ResponseEntity<DanhMucSanPham> create(@RequestBody DanhMucSanPham danhMuc) {
        return ResponseEntity.ok(service.create(danhMuc));
    }

    // PUT /api/danh-muc-san-pham/{id} → cập nhật
    @PutMapping("/{id}")
    public ResponseEntity<DanhMucSanPham> update(@PathVariable String id,
                                                  @RequestBody DanhMucSanPham danhMuc) {
        return ResponseEntity.ok(service.update(id, danhMuc));
    }

    // DELETE /api/danh-muc-san-pham/{id} → xóa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
