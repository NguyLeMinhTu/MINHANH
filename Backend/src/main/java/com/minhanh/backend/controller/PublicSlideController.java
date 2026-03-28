package com.minhanh.backend.controller;

import com.minhanh.backend.dto.SlideDto;
import com.minhanh.backend.service.SlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/slides")
@RequiredArgsConstructor
public class PublicSlideController {

    private final SlideService slideService;

    @GetMapping
    public ResponseEntity<List<SlideDto>> getPublic() {
        return ResponseEntity.ok(slideService.getPublic());
    }
}
