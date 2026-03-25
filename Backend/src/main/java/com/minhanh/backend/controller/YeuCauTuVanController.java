package com.minhanh.backend.controller;

import com.minhanh.backend.entity.YeuCauTuVan;
import com.minhanh.backend.service.YeuCauTuVanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/yeu-cau-tu-van")
public class YeuCauTuVanController {

    @Autowired
    private YeuCauTuVanService service;

    @PostMapping
    public ResponseEntity<YeuCauTuVan> create(@RequestBody YeuCauTuVan yc) {
        return ResponseEntity.ok(service.create(yc));
    }
}
