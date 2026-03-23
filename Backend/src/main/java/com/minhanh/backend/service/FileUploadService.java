package com.minhanh.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String publicId = "minhanh-" + UUID.randomUUID().toString(); // Random UUID để tránh trùng file
        
        // Gọi lên máy chủ Cloudinary để lưu hình ảnh
        Map uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), 
                ObjectUtils.asMap("public_id", publicId));

        // Trả về địa chỉ HTTPS an toàn của tấm hình
        return uploadResult.get("secure_url").toString();
    }
}
