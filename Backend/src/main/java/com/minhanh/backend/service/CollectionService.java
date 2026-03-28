package com.minhanh.backend.service;

import com.minhanh.backend.dto.CollectionDto;
import com.minhanh.backend.dto.CollectionRequest;
import com.minhanh.backend.entity.BoSuuTap;
import com.minhanh.backend.repository.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final FileUploadService fileUploadService;

    public List<CollectionDto> getAll() {
        return collectionRepository.findAllByOrderByThuTuAsc().stream()
                .map(this::toDto)
                .toList();
    }

    public List<CollectionDto> getPublic() {
        return collectionRepository.findByTrangThaiOrderByThuTuAsc("hien").stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public CollectionDto create(CollectionRequest req) {
        BoSuuTap collection = BoSuuTap.builder()
                .tieuDe(req.getTieuDe())
                .moTa(req.getMoTa())
                .urlHinh(req.getUrlHinh())
                .link(req.getLink())
                .thuTu(req.getThuTu())
                .trangThai(req.getTrangThai() != null ? req.getTrangThai() : "hien")
                .build();
        return toDto(collectionRepository.save(collection));
    }

    @Transactional
    public CollectionDto update(String id, CollectionRequest req) {
        BoSuuTap collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bộ sưu tập: " + id));

        if (req.getUrlHinh() != null && !req.getUrlHinh().equals(collection.getUrlHinh())) {
            if (collection.getUrlHinh() != null) fileUploadService.deleteFile(collection.getUrlHinh());
            collection.setUrlHinh(req.getUrlHinh());
        }
        if (req.getTieuDe() != null) collection.setTieuDe(req.getTieuDe());
        if (req.getMoTa() != null) collection.setMoTa(req.getMoTa());
        if (req.getLink() != null) collection.setLink(req.getLink());
        if (req.getThuTu() != null) collection.setThuTu(req.getThuTu());
        if (req.getTrangThai() != null) collection.setTrangThai(req.getTrangThai());

        return toDto(collectionRepository.save(collection));
    }

    @Transactional
    public CollectionDto toggle(String id) {
        BoSuuTap collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bộ sưu tập: " + id));
        collection.setTrangThai("hien".equals(collection.getTrangThai()) ? "an" : "hien");
        return toDto(collectionRepository.save(collection));
    }

    @Transactional
    public void delete(String id) {
        BoSuuTap collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bộ sưu tập: " + id));
        if (collection.getUrlHinh() != null) fileUploadService.deleteFile(collection.getUrlHinh());
        collectionRepository.delete(collection);
    }

    @Transactional
    public void reorder(List<String> ids) {
        for (int i = 0; i < ids.size(); i++) {
            final int thuTu = i + 1;
            collectionRepository.findById(ids.get(i)).ifPresent(coll -> {
                coll.setThuTu(thuTu);
                collectionRepository.save(coll);
            });
        }
    }

    private CollectionDto toDto(BoSuuTap coll) {
        return new CollectionDto(
                coll.getId(),
                coll.getTieuDe(),
                coll.getMoTa(),
                coll.getUrlHinh(),
                coll.getLink(),
                coll.getThuTu(),
                coll.getTrangThai()
        );
    }
}
