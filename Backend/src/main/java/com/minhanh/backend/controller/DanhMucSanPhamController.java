package com.minhanh.backend.controller;

import com.minhanh.backend.dto.DanhMucMenuDto;
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

    // GET /api/danh-muc-san-pham/tree → Lấy cây danh mục cho Menu
    @GetMapping("/tree")
    public List<DanhMucMenuDto> getTree() {
        return service.getCategoryTree();
    }

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
    public ResponseEntity<?> create(@RequestBody com.minhanh.backend.dto.DanhMucRequestDto req) {
        try {
            service.create(req);
            return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Thêm mới thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Collections.singletonMap("message", "Lỗi tạo mới Backend: " + e.getMessage()));
        }
    }

    // PUT /api/danh-muc-san-pham/{id} → cập nhật
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id,
                                                  @RequestBody com.minhanh.backend.dto.DanhMucRequestDto req) {
        try {
            service.update(id, req);
            return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Cập nhật thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Collections.singletonMap("message", "Lỗi update Backend: " + e.getMessage()));
        }
    }

    // DELETE /api/danh-muc-san-pham/{id} → xóa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
