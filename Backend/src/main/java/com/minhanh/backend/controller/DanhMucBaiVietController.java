package com.minhanh.backend.controller;

import com.minhanh.backend.dto.DanhMucBaiVietRequestDto;
import com.minhanh.backend.entity.DanhMucBaiViet;
import com.minhanh.backend.service.DanhMucBaiVietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/danh-muc-bai-viet")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DanhMucBaiVietController {

    @Autowired
    private DanhMucBaiVietService service;

    // GET /api/danh-muc-bai-viet → lấy tất cả
    @GetMapping
    public List<DanhMucBaiViet> getAll() {
        return service.getAll();
    }

    // GET /api/danh-muc-bai-viet/{id} → lấy chi tiết
    @GetMapping("/{id}")
    public DanhMucBaiViet getById(@PathVariable String id) {
        return service.getById(id);
    }

    // POST /api/danh-muc-bai-viet → tạo mới
    @PostMapping
    public ResponseEntity<?> create(@RequestBody DanhMucBaiVietRequestDto req) {
        try {
            service.create(req);
            return ResponseEntity.ok(Collections.singletonMap("message", "Thêm mới thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "Lỗi tạo mới Backend: " + e.getMessage()));
        }
    }

    // PUT /api/danh-muc-bai-viet/{id} → cập nhật
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id,
                                    @RequestBody DanhMucBaiVietRequestDto req) {
        try {
            service.update(id, req);
            return ResponseEntity.ok(Collections.singletonMap("message", "Cập nhật thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "Lỗi update Backend: " + e.getMessage()));
        }
    }

    // DELETE /api/danh-muc-bai-viet/{id} → xóa DB vĩnh viễn (hoặc xóa mềm phụ thuộc Service)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Xóa thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "Lỗi xóa Backend: " + e.getMessage()));
        }
    }
}
