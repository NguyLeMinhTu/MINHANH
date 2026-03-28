package com.minhanh.backend.controller;

import com.minhanh.backend.dto.CollectionDto;
import com.minhanh.backend.dto.CollectionRequest;
import com.minhanh.backend.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping
    public ResponseEntity<List<CollectionDto>> getAll() {
        return ResponseEntity.ok(collectionService.getAll());
    }

    @PostMapping
    public ResponseEntity<CollectionDto> create(@RequestBody CollectionRequest req) {
        return ResponseEntity.ok(collectionService.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionDto> update(@PathVariable String id, @RequestBody CollectionRequest req) {
        return ResponseEntity.ok(collectionService.update(id, req));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<CollectionDto> toggle(@PathVariable String id) {
        return ResponseEntity.ok(collectionService.toggle(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        collectionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> reorder(@RequestBody List<String> ids) {
        collectionService.reorder(ids);
        return ResponseEntity.ok().build();
    }
}
