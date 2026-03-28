package com.minhanh.backend.controller;

import com.minhanh.backend.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {

    private final FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "File ảnh không được để trống (Empty File)"));
        }
        try {
            String imageUrl = fileUploadService.uploadFile(file);
            return ResponseEntity.ok(Map.of("url", imageUrl));
        } catch (Exception e) {
            System.err.println("[Upload] Lỗi upload ảnh: " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Lỗi upload: " + e.getMessage()));
        }
    }
}
