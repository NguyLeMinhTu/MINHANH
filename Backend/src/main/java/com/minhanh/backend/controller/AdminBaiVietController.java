package com.minhanh.backend.controller;

import com.minhanh.backend.dto.BaiVietRequestDto;
import com.minhanh.backend.dto.BaiVietResponseDto;
import com.minhanh.backend.entity.BaiViet;
import com.minhanh.backend.service.BaiVietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/bai-viet")
public class AdminBaiVietController {

    @Autowired
    private BaiVietService service;

    @GetMapping
    public ResponseEntity<Page<BaiVietResponseDto>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(service.getAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaiVietResponseDto> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getByIdDto(id));
    }

    @PostMapping
    public ResponseEntity<BaiViet> create(@RequestBody BaiVietRequestDto req) {
        return ResponseEntity.ok(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaiViet> update(@PathVariable String id, @RequestBody BaiVietRequestDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
