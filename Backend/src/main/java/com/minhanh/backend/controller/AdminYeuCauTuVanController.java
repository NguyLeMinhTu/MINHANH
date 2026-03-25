package com.minhanh.backend.controller;

import com.minhanh.backend.entity.YeuCauTuVan;
import com.minhanh.backend.service.YeuCauTuVanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/yeu-cau-tu-van")
public class AdminYeuCauTuVanController {

    @Autowired
    private YeuCauTuVanService service;

    @GetMapping
    public ResponseEntity<Page<YeuCauTuVan>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean daXuLy) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(service.search(search, daXuLy, pageable));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<YeuCauTuVan> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, Object> body) {
        Boolean daXuLy = (Boolean) body.get("daXuLy");
        String ghiChu = (String) body.get("ghiChuNoiBo");
        return ResponseEntity.ok(service.updateStatus(id, daXuLy, ghiChu));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
