package com.minhanh.backend.controller;

import com.minhanh.backend.dto.SlideDto;
import com.minhanh.backend.dto.SlideRequest;
import com.minhanh.backend.service.SlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/slides")
@RequiredArgsConstructor
public class SlideController {

    private final SlideService slideService;

    @GetMapping
    public ResponseEntity<List<SlideDto>> getAll() {
        return ResponseEntity.ok(slideService.getAll());
    }

    @PostMapping
    public ResponseEntity<SlideDto> create(@RequestBody SlideRequest req) {
        return ResponseEntity.ok(slideService.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SlideDto> update(@PathVariable String id, @RequestBody SlideRequest req) {
        return ResponseEntity.ok(slideService.update(id, req));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<SlideDto> toggle(@PathVariable String id) {
        return ResponseEntity.ok(slideService.toggle(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        slideService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> reorder(@RequestBody List<String> ids) {
        slideService.reorder(ids);
        return ResponseEntity.ok().build();
    }
}
