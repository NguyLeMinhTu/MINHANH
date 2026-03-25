package com.minhanh.backend.service;

import com.minhanh.backend.entity.YeuCauTuVan;
import com.minhanh.backend.repository.YeuCauTuVanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class YeuCauTuVanService {

    @Autowired
    private YeuCauTuVanRepository repository;

    @Autowired
    private NotificationService notificationService;

    public Page<YeuCauTuVan> search(String search, Boolean daXuLy, Pageable pageable) {
        return repository.searchByAdmin(search, daXuLy, pageable);
    }

    public Page<YeuCauTuVan> getAll(Pageable pageable, Boolean daXuLy) {
        if (daXuLy != null) {
            return repository.findByDaXuLyOrderByNgayGuiDesc(daXuLy, pageable);
        }
        return repository.findAllByOrderByNgayGuiDesc(pageable);
    }

    public YeuCauTuVan getById(String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy yêu cầu với ID: " + id));
    }

    @Transactional
    public YeuCauTuVan create(YeuCauTuVan yc) {
        yc.setNgayGui(LocalDateTime.now());
        yc.setDaXuLy(false);
        YeuCauTuVan saved = repository.save(yc);
        notificationService.sendNotification("CÓ YÊU CẦU TƯ VẤN MỚI: " + saved.getTenKhach());
        return saved;
    }

    @Transactional
    public YeuCauTuVan updateStatus(String id, Boolean daXuLy, String ghiChu) {
        YeuCauTuVan yc = getById(id);
        yc.setDaXuLy(daXuLy);
        if (ghiChu != null) {
            yc.setGhiChuNoiBo(ghiChu);
        }
        return repository.save(yc);
    }

    @Transactional
    public void delete(String id) {
        repository.deleteById(id);
    }
}
